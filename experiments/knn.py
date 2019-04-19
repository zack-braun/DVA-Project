import csv
import json
import ast
import time
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.cm as cm
from sklearn.neighbors import NearestNeighbors
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_samples, silhouette_score
from sklearn.cluster import AgglomerativeClustering
from sklearn.decomposition import PCA
from sklearn.externals import joblib
import networkx as nx

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
                                    'Finance': row[-1],
                                    'ideaology': row[-2]}
            line_count += 1
    print(f'Processed {line_count} lines.')
    return TableDict


def show_graph_with_labels(adjacency_matrix, mylabels):
    rows, cols = np.where(adjacency_matrix == 1.)
    edges = zip(rows.tolist(), cols.tolist())
    gr = nx.Graph()
    gr.add_edges_from(edges)
    nx.draw(gr, node_size=100,  with_labels=True, node_text_size=5)
    plt.show()

def saveModel(model, filename):
  # save the model to disk
  joblib.dump(model, filename)

def kmeans(arr):
  #kmeans = KMeans(n_clusters=2, random_state=0).fit(arr)
  #print(arr[0])
  range_n_clusters = range(2, len(arr))
  silhouette_avgs = []
  #print(arr)
  for n_clusters in range_n_clusters:

    kmeans = KMeans(n_clusters=n_clusters)
    kmeansLabels = kmeans.fit_predict(arr)
    #print(kmeans.labels_)
    #print(kmeans.cluster_centers_)

    # The silhouette_score gives the average value for all the samples.
    # This gives a perspective into the density and separation of the formed
    # clusters
    silhouette_avg = silhouette_score(arr, kmeansLabels)
    print("For n_clusters =", n_clusters,
          "The average silhouette_score is :", silhouette_avg)


    silhouette_avgs.append(silhouette_avg)
    # Compute the silhouette scores for each sample
    #sample_silhouette_values = silhouette_samples(arr, cluster_labels)


  data = []
  #print(len(arr))
  for i in range(len(arr)):
    data.append([arr[i][0], arr[i][1]])
  plt.plot(range_n_clusters, silhouette_avgs)
  plt.title('K-means clustering Silhouette Scores')
  plt.ylabel("Silhouette Average")
  plt.xlabel("Number of Clusters")
  plt.savefig("K-means Silhouette Scores")


  #plt.show()

  deltas = list()
  bestCluster = None
  for n_cluster in range_n_clusters:
    print(n_cluster)
    delta = silhouette_avgs[n_cluster - 2] - silhouette_avgs[n_cluster - 1]
    deltas.insert(0, delta)
    if len(deltas) > 10:
      if sum(deltas) / float(len(deltas)) < 0.0005:
        bestCluster = n_cluster
        break
      deltas.pop()

  print(bestCluster)

  data = np.array(arr)

  kmeans = KMeans(n_clusters=bestCluster)
  kmeans.fit(arr)
  print(kmeans.labels_)
  saveModel(kmeans, '../Node/controllers/kmeans.sav')
  kmeans.fit(data[:, 0:2])

  Z = kmeans.predict(data[:, 0:2])

  plt.figure(1)
  plt.clf()

  colors = cm.rainbow(np.linspace(0, 1, bestCluster))
  for i in range(len(data)):
    X = data[i, 0]
    y = data[i, 1]
    color = colors[Z[i]]
    plt.plot(X, y, 'k.', markersize=4, color=color)
    #plt.plot(data[:, 0], data[:, 1], 'k.', markersize=2)
  # Plot the centroids as a white X
  centroids = kmeans.cluster_centers_
  print(centroids)
  plt.scatter(centroids[:, 0], centroids[:, 1],
              marker='x', s=169, linewidths=3,
              color='k', zorder=10)
  plt.title('K-means clustering')
  plt.ylabel("Health Contributions (Normalized)")
  plt.xlabel("DW-Nominate (Normalized)")
  #plt.show()
  plt.savefig("K-means clustering")

def nn(arr):
  algorithms = ["ball_tree", "kd_tree", "brute"]
  algorithms = ["ball_tree"]
  leafSize = range(1, len(arr))
  leafSize = range(1,2)
  metrics = ['cityblock', 'minkowski', 'euclidean', 'l1', 'manhattan']
  metrics = ["cityblock"]
  Dict = {}
  mini = 100000000
  miniAlgo = None
  miniSize = 0
  miniMetric = None
  for algorithm in algorithms:
    #print(algorithm)
    Dict[algorithm] = {}
    for size in leafSize:
      Dict[algorithm][size] = {}
      #print(size)
      for metric in metrics:
        Dict[algorithm][size][metric] = {}
        #print(metric)
        nn = NearestNeighbors(n_neighbors=6, algorithm = algorithm, leaf_size = size, metric = metric).fit(arr)
        distances, indices = nn.kneighbors(arr)
        calcSilScore(distances)
        #print(indices)
        #print(len(distances))
        avgDistance = 0.0
        for i in range(0, len(distances)):
          rowDistance = 0.0
          for j in range(0, len(distances[0])):
            if(j != 0): #skip 0 since that is itself
              rowDistance += distances[i][j]
          #print(rowDistance)
          avgDistance += (rowDistance / 5.0)
        avgDistance = avgDistance / len(distances)
        Dict[algorithm][size][metric] = avgDistance
        if(avgDistance < mini):
          mini = avgDistance
          miniAlgo = algorithm
          miniSize = size
          miniMetric = metric
        #print(avgDistance)

  print(mini)
  print(miniAlgo)
  print(miniSize)
  print(miniMetric)
  df = pd.DataFrame.from_dict(Dict)
  #print(df)
  #df.plot()
  #plt.show()
  df.to_csv('NNEvaluation.csv')
  #knn_graph = nn.kneighbors_graph(arr).toarray()
  #print(knn_graph)
  #show_graph_with_labels(knn_graph, range(0, len(arr)))
  #plt.plot(knn_graph)
  #plt.show()


def normalize(val, mini, maxi):
  nominator = val - (mini)
  denominator = maxi - (mini)
  return (nominator/denominator)

def inverseNormalize(normalizedVal, mini, maxi):
  val = (normalizedVal * (maxi - mini)) + mini
  return val

def parseFinanceData(Dict):

  rows = []
  for key, value in Dict.items():
    #print(key)
    #print(value)
    #print(value['Finance'])
    jsoned = ast.literal_eval(value['Finance'])
    json2 = ast.literal_eval(value['ideaology'])
    #print(jsoned['Health'])
    for key2, value2 in jsoned.items():
      if(value2 < 0 and key2 != 'dw_nominate'):
        jsoned[key2] = 0

    total = jsoned['Health']+ \
            jsoned['Finance, Insurance & Real Estate'] + \
            jsoned['Defense & Global Relations'] + \
            jsoned['Agriculture, Food, & Consumer Goods'] + \
            jsoned['Labor/Employment'] + \
            jsoned['Energy & Transportation']

    #print(value['dw_nominate'])

    #dw = normalize(float(value['dw_nominate']), -1.0, 1.0)
    agFood = normalize(float(json2['AgFood']), -1, 1)
    defense2 = normalize(float(json2['DefenseGlobal']), -1, 1)
    et = normalize(float(json2['EnergyTransport']), -1, 1)
    fin = normalize(float(json2['Finance']), -1, 1)
    he = normalize(float(json2['Health']), -1, 1)
    le = normalize(float(json2['LaborEmployment']), -1, 1)
    dw = normalize(float(value['dw_nominate']), -1, 1) * 2.0

    row = [dw, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, agFood, defense2, et, fin, he, le]
    if(total != 0):
      health = jsoned['Health'] / total
      realEstate = jsoned['Finance, Insurance & Real Estate'] / total
      defense = jsoned['Defense & Global Relations'] / total
      ag = jsoned['Agriculture, Food, & Consumer Goods'] / total
      labor = jsoned['Labor/Employment'] / total
      energy = jsoned['Energy & Transportation'] / total
      row  = [dw,
              health,
              realEstate,
              defense,
              ag ,
              labor ,
              energy,
              agFood,
              defense2,
              et,
              fin,
              he,
              le]

    rows.append(row)
  #print(rows)
  return rows

if __name__ == "__main__":
  Dict = readCSV()
  arr = parseFinanceData(Dict)
  #nn(arr)
  kmeans(arr)
