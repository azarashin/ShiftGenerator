# -*- coding: utf-8 -*-

class ShiftSlot(object):
  def __init__(self, id, require):
    self.id = id
    self.require = require
    
  def __str__(self):
    return '{}: {}'.format(self.id, self.require)
