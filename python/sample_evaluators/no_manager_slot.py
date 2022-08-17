# -*- coding: utf-8 -*-

import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from core.interface_eval import IEval 

class NoManagerSlot(IEval):

  def eval(self, utility, container):
    targets = []
    for slot in container.frame.slots:
      manager_included = False
      user_nos = utility.get_user_nos_by_box_name(container, slot.id)
      for user_no in user_nos:
        e = container.employees[user_no]
        if e.manager:
          manager_included = True
      if not manager_included:
        targets.append(slot.id)
        
    result =  len(targets) / (len(container.frame.slots))
    return result
