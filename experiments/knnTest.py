import requests
import itertools
import numpy as np
import pandas as pd
import json

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
  MemberIdDF = MemberIdDF.loc[:,['govtrack', 'opensecrets']].rename(columns = {'govtrack':'govtrack_id'})

  MemberIdDF.loc[:, 'govtrack_id2'] = MemberIdDF.govtrack_id.astype(int)
  MemberIdDF.drop({'govtrack_id'}, axis = 1, inplace = True)

  # Create different typed column to join on
  df.loc[:, 'govtrack_id2'] = df.govtrack_id.astype(int)

  # Join in the opensecrets Ids
  df = pd.merge(df, MemberIdDF[MemberIdDF.govtrack_id2.notna()], on = 'govtrack_id2', how = 'left')

  #delete dup govtrack_ids
  del df['govtrack_id2']

  return df

def stripData(allMemberDF):
  fecCandsDF = allMemberDF[allMemberDF['fec_candidate_id'] != '']
  cleanedDF = fecCandsDF[['dw_nominate', 'govtrack_id']] #, 'icpsr_id' add if using addVoteViewData
  cleanedDF.dropna(inplace=True)
  #print(cleanedDF)
  return cleanedDF

def createCatTable():


def lookupCategorization(sector):
  print(sector)


def getCampaignFinance(row, catTable):
  print(row)
  url = "https://www.opensecrets.org/api/?method=candIndustry"
  params = {'apikey': apiKey4OpenSecrets,
            'cid':'N00007360',
            'output': 'json'}
  r = requests.get(url, params=params)
  print(r.url)
  print(r)
  jsoned = r.json()
  dicti = jsoned['response']['industries']['industry']
  financeDictArr = []
  for industry in dicti:
    category = lookupCategorization(industry['industry_code'])
    #financeDict{
                #'industry': industry['industry_code'],
                #'total':industry['total']
                #}
    #financeDictArr.append(financeDict)




if __name__ == "__main__":

  # Populate required API options
  firstCongress = 113
  lastCongress = 115
  congress = [str(c) for c in range(firstCongress, lastCongress+1)]
  chamber = ["house", "senate"]
  endPoint = "members.json"

  allMemberDF = getMemberData(congress, chamber, endPoint)
  stripedMemberDF = stripData(allMemberDF)
  openSecretDF = addOpenSecretsIDs(stripedMemberDF)
  print(openSecretDF)
  getCampaignFinance(openSecretDF[:1])





