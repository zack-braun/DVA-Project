import csv
import json
import ast
import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors

def readCSV():
  with open('combinedData.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    TableDict = {}
    for row in csv_reader:
        if line_count == 0:
            print(f'Column names are {", ".join(row)}')
            line_count += 1
        else:
            #print(row)
            #print(len(row))
            TableDict[row[0]] = {'dw_nominate': row[1],
                                    'Finance': row[-1]}
            line_count += 1
    print(f'Processed {line_count} lines.')
    return TableDict

def nn(arr):
  print(arr[0])
  nn = NearestNeighbors(n_neighbors=2, algorithm = "ball_tree").fit(arr)
  distances, indices = nn.kneighbors(arr)
  print(distances)
  print(indices)


def parseFinanceData(Dict):

  rows = []
  for key, value in Dict.items():
    #print(key)
    #print(value)
    #print(value['Finance'])
    jsoned = ast.literal_eval(value['Finance'])
    #print(jsoned['Health'])
    total = jsoned['Health']+ \
            jsoned['Finance, Insurance & Real Estate'] + \
            jsoned['Defense & Global Relations'] + \
            jsoned['Agriculture, Food, & Consumer Goods'] + \
            jsoned['Labor/Employment'] + \
            jsoned['Energy & Transportation']
    #print(value['dw_nominate'])
    dw = float(value['dw_nominate'])
    row = [dw, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
    if(total != 0):
      health = jsoned['Health'] / total
      realEstate = jsoned['Finance, Insurance & Real Estate'] / total
      defense = jsoned['Defense & Global Relations'] / total
      ag = jsoned['Agriculture, Food, & Consumer Goods'] / total
      labor = jsoned['Labor/Employment'] / total
      energy = jsoned['Energy & Transportation'] / total
      row  = [dw, health, realEstate, defense, ag, labor, energy]
    #print(row)
    rows.append(row)
  return rows

if __name__ == "__main__":
  Dict = readCSV()
  arr = parseFinanceData(Dict)
  nn(arr)
