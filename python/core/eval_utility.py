# -*- coding: utf-8 -*-

class EvalUtility:
    
  def __init__(self):
      pass

  # ユーザ番号を指定してコマ名を取得する
  def get_boxes_by_user(self, container, user_no,):
    line = container.slice()[user_no]
    return self.line_to_box(container, line)

  # 1ユーザ分のタプルからコマ名を取得する
  def line_to_box(self, container, line):
    result = []
    index = 0
    for e in line:
      if e == 1:
        result.append(container.frame.slots[index].id)
      index = index + 1
    return result    

  # コマ番号を指定してアサインされているユーザ番号リストを取得する
  def get_user_nos_by_box_index(self, container, box_index):
    user_nos = []
    index = 0
    for line in container.slice():
      if line[box_index] == 1:
        user_nos.append(index)
      index += 1
    return user_nos

  # コマ名を指定してアサインされているユーザ番号リストを取得する
  def get_user_nos_by_box_name(self, container, slot_name):
    slot_index = container.frame.index_of_id(slot_name)
    return self.get_user_nos_by_box_index(container, slot_index)
