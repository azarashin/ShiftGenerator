# -*- coding: utf-8 -*-

import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from core.interface_eval import IEval 

class NotApplicatedAssign(IEval):

  def eval(self, utility, container):
    count = 0
    for slot in container.frame.slots:
      user_nos = utility.get_user_nos_by_box_name(container, slot.id)
      for user_no in user_nos:
        e = container.employees[user_no]
        if not e.is_applicated(slot.id):
          count += 1
    result =  count / (len(container.frame.slots) * len(container.employees))
    return result
