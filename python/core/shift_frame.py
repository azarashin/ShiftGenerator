# -*- coding: utf-8 -*-

class ShiftFrame(object):
  def __init__(self, slots):
    self.slots = slots
    
  def index_of_id(self, slot_name):
      return [d.id for d in self.slots].index(slot_name)
    
  def __len__(self):
    return len(self.slots)
