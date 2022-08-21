# -*- coding: utf-8 -*-

class ShiftInspector:
    
  def __init__(self):
      pass

  # ユーザ別にアサインコマ名を出力する
  def print_inspect(self, container):
    user_no = 0
    for line in container.slice():
      print("ユーザ%d" % user_no)
      print(line)
      user_no = user_no + 1

      index = 0
      for e in line:
        if e == 1:
          print(container.frame.slots[index].id)
        index = index + 1
  
  def slot_to_wish(self, slot):
    data = slot.split('\t')
    return {
      'date': '{}/{}/{}'.format(data[0], data[1], data[2]), 
      'wish': data[3]
    }
  
  def get_json(self, container, names):
    user_no = 0
    datas = [[container.frame.slots[i].id for i in range(len(line)) if line[i] == 1]
      for line in container.slice()]
    json = [{
        'name': names[i], 
        'slots': [self.slot_to_wish(d) for d in datas[i]]
      } for i in range(len(datas))]
    return json

  # CSV形式でアサイン結果の出力をする
  def print_csv(self, container):
    for line in container.slice():
      print(','.join(map(str, line)))

  # TSV形式でアサイン結果の出力をする
  def print_tsv(self, container):
    for line in container.slice():
      print("\t".join(map(str, line)))

