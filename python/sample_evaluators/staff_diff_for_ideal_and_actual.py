# -*- coding: utf-8 -*-

import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from core.interface_eval import IEval 

class StaffDiffForIdealAndActual(IEval):

  def eval(self, utility, container):
    diffs = []
    index = 0
    for slot in container.frame.slots:
      actual = len(utility.get_user_nos_by_box_index(container, index))
      diffs.append(abs(slot.require - actual))
      index += 1
      
    result = sum(diffs) / (len(container.frame.slots) * len(container.employees))
    return result
