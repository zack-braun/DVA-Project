import requests
import itertools
import numpy as np
import pandas as pd
import json
import csv

apiKey4ProPublica = 'gKufsGOW6vGeCqfYQiVNkuITq7h1fytjlfaL1Qtq';
apiKey4OpenSecrets = 'd3f8992dc4e2d3ad0d1c50fcbecea064';
baseUrl = "https://api.propublica.org/congress/v1/"


def getMemberData(congress, chamber, endPoint):
  apiRequestList = [requests.get(baseUrl+combo[0]+"/"+combo[1]+"/"+endPoint, headers = {'X-API-Key': apiKey4ProPublica})
                    for combo in itertools.product(congress, chamber)]

  members = []

  # For each request we'll check the status and then use results to extend list of member JSONs
  for i,resp in enumerate(apiRequestList):
      if (resp.status_code == requests.codes.ok):
          respJSON = resp.json()
          #if respJSON['status'] == 'OK':
          congress = respJSON['results'][0]['congress']
          chamber = respJSON['results'][0]['chamber']
          members.extend( [dict(member, congress = congress, chamber = chamber)
                             for member in respJSON['results'][0]['members'] ] )

  allMemberDF = pd.DataFrame(members)
  #print(allMemberDF.dtypes)
  #print(allMemberDF.head())
  return allMemberDF

def addOpenSecretsIDs(df):
  usAPIBaseUrl = ["https://theunitedstates.io/congress-legislators/"]
  usAPIEndpoints = ["legislators-current.json", "legislators-historical.json"]
  # We can read in some JSON info from https://theunitedstates.io/congress-legislators/legislators-current.json
  usAPILeg = [requests.get(combo[0]+combo[1]) for combo in itertools.product(usAPIBaseUrl, usAPIEndpoints)]
  usAPIMembers = [member for request in usAPILeg for member in request.json() ]

  usAPIMemberDF = pd.DataFrame(usAPIMembers)
  MemberIdDF = usAPIMemberDF.id.apply(pd.Series)
  #print(MemberIdDF)
  MemberIdDF = MemberIdDF.loc[:,['govtrack', 'opensecrets', 'bioguide']].rename(columns = {'govtrack':'govtrack_id'})
  #print(MemberIdDF)
  MemberIdDF.loc[:, 'govtrack_id2'] = MemberIdDF.govtrack_id.astype(int)
  MemberIdDF.drop({'govtrack_id'}, axis = 1, inplace = True)

  # Create different typed column to join on
  df.loc[:, 'govtrack_id2'] = df.govtrack_id.astype(int)

  # Join in the opensecrets Ids
  df = pd.merge(df, MemberIdDF[MemberIdDF.govtrack_id2.notna()], on = 'govtrack_id2', how = 'left')

  #delete dup govtrack_ids
  del df['govtrack_id2']

  df.dropna(subset = ['opensecrets'], inplace=True)

  return df

def stripData(allMemberDF, missingDWDict):
  fecCandsDF = allMemberDF[allMemberDF['govtrack_id'] != '']
  cleanedDF = fecCandsDF[['dw_nominate',
                          'govtrack_id',
                          'at_large',
                          'chamber',
                          'congress',
                          'date_of_birth',
                          'district',
                          'first_name',
                          'gender',
                          'in_office',
                          'last_name',
                          'last_updated',
                          'leadership_role',
                          'middle_name',
                          'missed_votes',
                          'missed_votes_pct',
                          'next_election',
                          'office',
                          'party',
                          'senate_class',
                          'seniority',
                          'short_title',
                          'state',
                          'state_rank',
                          'suffix',
                          'title',
                          'total_present',
                          'total_votes',
                          'votes_with_party_pct']] #, 'icpsr_id' add if using addVoteViewData
  #print(cleanedDF)
  #print(missingDWDict)

  """for index, row in cleanedDF.iterrows():
    for key, value in missingDWDict.items():
      #print(value)
      if(row['govtrack_id'] == key):
        cleanedDF.at[index, 'dw_nominate'] = value['dw_nominate']
        print(row['dw_nominate'])"""
  #cleanedDF[cleanedDF['govtrack_id'] == key]['dw_nominate'] = 2000
  #print(missingDWDict)
  cleanedDF['dw_nominate'] = cleanedDF['govtrack_id'].map(missingDWDict).fillna(cleanedDF['dw_nominate'])
  #print(cleanedDF)
  cleanedDF.dropna(subset = ['govtrack_id', 'dw_nominate'], inplace=True)
  #print((cleanedDF.shape))
  return cleanedDF

def createMissingDWTable():
    with open('missingDWpredictions.csv') as csv_file:
      csv_reader = csv.reader(csv_file, delimiter=',')
      line_count = 0
      missingDWDict = {}
      for row in csv_reader:
          if line_count == 0:
              #print(f'Column names are {", ".join(row)}')
              line_count += 1
          else:
              #print(row)
              missingDWDict[row[1]] = row[11]
              line_count += 1
      #print(f'Processed {line_count} lines.')
      return missingDWDict

def addLegislativeIdealogy():
      with open('ideologyByBillTopic.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        ideologyDWDict = {}
        for row in csv_reader:
            if line_count == 0:
                #print(f'Column names are {", ".join(row)}')
                line_count += 1
            else:
                #print(row)
                ideologyDWDict[row[1]] = {'AgFood': row[2],
                                          'DefenseGlobal': row[3],
                                          'EnergyTransport':row[4],
                                          'Finance':row[5],
                                          'Health':row[6],
                                          'LaborEmployment':row[7]}
                line_count += 1
        #print(f'Processed {line_count} lines.')
      print(ideologyDWDict)
      return ideologyDWDict

def createCatTable():
  with open('Catcode.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    CatTableDict = {}
    for row in csv_reader:
        if line_count == 0:
            #print(f'Column names are {", ".join(row)}')
            line_count += 1
        else:
            #print(row)
            CatTableDict[row[2][0]] = {
                                    'CatCode': row[0],
                                    'name': row[1]}
            line_count += 1
    #print(f'Processed {line_count} lines.')
    return CatTableDict


def lookupCategorization(sector, catTable):
  if(sector != ''):
    row = catTable[sector]
    return row['name']
  else:
    return 'EXCLUDED'




def getCampaignFinance(row, catTable):
  #print(row['opensecrets'])
  url = "https://www.opensecrets.org/api/?method=candSector"
  params = {'apikey': apiKey4OpenSecrets,
            'cid': str(row['opensecrets']),
            'cycle': 2018,
            'output': 'json'}
  r = requests.get(url, params=params)
  if(r.status_code == requests.codes.ok):
    #print(r.url)
    #print(r)
    #print(r.json())
    jsoned = r.json()
    dicti = jsoned['response']['sectors']['sector']
    financeDict = {
                  'Health': 0,
                  'Finance, Insurance & Real Estate': 0,
                  'Defense & Global Relations': 0,
                  'Agriculture, Food, & Consumer Goods': 0,
                  'Labor/Employment':0,
                  'Energy & Transportation': 0}
    for industry in dicti:
      #print(industry)
      #print(len(industry))
      if(len(industry) == 1):
        category = lookupCategorization(industry['@attributes']['sectorid'], catTable)
        if category == 'EXCLUDED':
          pass
          #do nothing
        else:
          financeDict[category] += (int)(industry['@attributes']['total'])
    #print(financeDict)
    return financeDict
  else:
    return float('nan')

def writeDF2CSV(df):
  df.to_csv('combinedData.csv')

if __name__ == "__main__":

  # Populate required API options
  firstCongress = 115
  lastCongress = 115
  congress = [str(c) for c in range(firstCongress, lastCongress+1)]
  chamber = ["house", "senate"]
  endPoint = "members.json"
  ideologyDWDict = addLegislativeIdealogy()
  catTable = createCatTable()
  allMemberDF = getMemberData(congress, chamber, endPoint)
  missingDW = createMissingDWTable()
  stripedMemberDF = stripData(allMemberDF, missingDW)
  openSecretDF = addOpenSecretsIDs(stripedMemberDF)
  #print(openSecretDF)
  financeDict = {}
  for i, row in openSecretDF.iterrows():
    #if i < 2:
    print(i)
    #print(row)
    financeDict[row['opensecrets']] = getCampaignFinance(row, catTable)
    #else:
      #pass

  openSecretDF['Finance'] = openSecretDF['opensecrets'].map(financeDict)
  openSecretDF.dropna(subset = ['Finance'], inplace=True)
  #print(openSecretDF.shape)
  writeDF2CSV(openSecretDF)





