# -*- coding: utf-8 -*-

import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from core.interface_eval import IEval 

class FewWorkStaff(IEval):

  def eval(self, utility, container):
    targets = []
    for user_no in range(len(container.employees)):
      e = container.employees[user_no]
      ratio = float(len(utility.get_boxes_by_user(container, user_no))) / float(len(e.wills))
      if ratio < 0.5:
        targets.append(e)
    result = len(targets) / (len(container.employees))
    return result
