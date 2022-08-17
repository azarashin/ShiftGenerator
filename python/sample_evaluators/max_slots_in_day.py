# -*- coding: utf-8 -*-

import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from core.interface_eval import IEval 

class MaxSlotsInDay(IEval):
  
  def __init__(self, max_slots_in_day):
    self._max_slots_in_day = max_slots_in_day

  def eval(self, utility, container):
    targets = []
    for user_no in range(len(container.employees)):
      boxes = utility.get_boxes_by_user(container, user_no)
      wdays = []
      for box in boxes:
        wdays.append(box.split('_')[0])
      wday_names = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
      for wday_name in wday_names:
        if wdays.count(wday_name) >= self._max_slots_in_day:
          targets.append(wday_name)
    result = len(targets) / (7 *  len(container.employees))
    return result
