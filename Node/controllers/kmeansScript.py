import sys
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_samples, silhouette_score
from sklearn.externals import joblib
import numpy as np
import math
import ast

def Twostr(arr):
  arr2 = arr.split(',')
  for i in range(len(arr2)):
    arr2[i] = float(arr2[i])
  #print(arr2)
  return [arr2]

def Threestr(arr):
  arr3 = ast.literal_eval(arr)
  #print(arr3)
  oneD = []
  twoD = []
  for i in range(len(arr3)):
    oneD.append(arr3[i])
    if(i % 13 == 0):
      twoD.append(oneD)
      oneD = []
  #print(twoD)
  return twoD

def predict(arr, model):
    #kmeans = KMeans(n_clusters=28)
    #print(model.labels_)
    #print(model.cluster_centers_)
    prediction = model.predict(arr)
    #print(prediction)
    return prediction, model.cluster_centers_, model.labels_

def loadModel():
  loaded_model = joblib.load('./controllers/kmeans.sav')
  return loaded_model

def distancefromCentroids(clusters, point, prediction):
  dist = []
  for cluster in clusters:
    total = 0
    for i in range(len(cluster)):
      #print(point[0][i])
      #print(cluster[i])
      total += ((cluster[i] - point[0][i])**2)
    total = math.sqrt(total)
    dist.append(total)
  index = np.argmax(dist)
  return dist[index], dist[prediction[0]]

def distancefromLocalPoints(prediction, labels, labelVecs, samplePoint):
  #print(len(labelVecs))
  #print("here")
  #print(prediction[0])
  dist = []
  for i in range(len(labels)):
    #print(labels[i])
    if(labels[i] == prediction[0]):
      total = 0
      #print(len(labelVecs[i]))
      for j in range(len(labelVecs[i])):
        #print(labelVecs[i][j])
        total += ((labelVecs[i][j] - samplePoint[0][j])**2)
      total = math.sqrt(total)
      dist.append((total, i))
  return dist

def convert2Percents(closePolys):
  polys = {}
  for poly in closePolys:
    #print(poly)
    #print(poly[0])
    percent = 1 / math.exp(poly[0]/4.0)
    #poly = (percent, poly[1])
    polys[str(poly[1])] = percent
  return polys

if __name__ == "__main__":
  # Takes first name and last name via command
  # line arguments and then display them
  #print("here")
  model = loadModel()
  #print("loaded model")
  samplePoint = Twostr(sys.argv[1])
  #print("after")
  #print(samplePoint)
  prediction, clusters, labels = predict(samplePoint, model)
  #print(prediction, clusters, labels)
  #maxCluster, minCluster = distancefromCentroids(clusters, samplePoint, prediction)

  vec = Threestr(sys.argv[2])
  #print(vec)
  closePolys = distancefromLocalPoints(prediction, labels, vec, samplePoint)
  print(convert2Percents(closePolys))

  #print(closePolys)
  #print(maxCluster)
  #print(minCluster)
  #print("here")
  #print(label)
  #print("Last name: " + sys.argv[2])
