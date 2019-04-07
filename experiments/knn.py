import csv

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
            TableDict[row[2]] = {'dw_nominate': row[1],
                                    'Finance': row[-1]}
            line_count += 1
    print(f'Processed {line_count} lines.')
    return TableDict

if __name__ == "__main__":
  Dict = readCSV()
  print(Dict)
