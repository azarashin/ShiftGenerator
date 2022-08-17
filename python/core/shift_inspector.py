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

  # CSV形式でアサイン結果の出力をする
  def print_csv(self, container):
    for line in container.slice():
      print(','.join(map(str, line)))

  # TSV形式でアサイン結果の出力をする
  def print_tsv(self, container):
    for line in container.slice():
      print("\t".join(map(str, line)))

