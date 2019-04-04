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

  # For each request we'll check the status and then use results to extend list of member JSON
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

def stripData(allMemberDF):
  fecCandsDF = allMemberDF[allMemberDF['fec_candidate_id'] != '']
  cleanedDF = fecCandsDF[['fec_candidate_id', 'dw_nominate', 'crp_id', 'icpsr_id']] #, 'icpsr_id' add if using addVoteViewData
  cleanedDF.dropna(inplace=True)
  #print(cleanedDF)
  return cleanedDF


#not working
def addVoteViewData(DF):
  votviewMemberInfo = "https://voteview.com/static/data/out/members/HSall_members.csv"
  voteviewMemberDF = pd.read_csv(votviewMemberInfo)
  print(voteviewMemberDF.columns)
  cleanedDF = voteviewMemberDF[['icpsr', 'nominate_dim1', 'nominate_dim2']]
  cleanedDF.dropna(inplace=True)
  cleanedDF.rename(columns={'icpsr':'icpsr_id'}, inplace=True)
  cleanedDF.sort_values(by="icpsr_id", inplace=True)
  DF.sort_values(by="icpsr_id", inplace=True)
  print(cleanedDF)
  print(DF)
  merged = pd.merge(DF, cleanedDF, on='icpsr_id', how='left')
  #merged.dropna(inplace=True)
  print(merged)


if __name__ == "__main__":

  # Populate required API options
  firstCongress = 113
  lastCongress = 115
  congress = [str(c) for c in range(firstCongress, lastCongress+1)]
  chamber = ["house", "senate"]
  endPoint = "members.json"

  allMemberDF = getMemberData(congress, chamber, endPoint)
  fecMemberDF = stripData(allMemberDF)
  addVoteViewData(fecMemberDF)



