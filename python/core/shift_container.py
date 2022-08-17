# -*- coding: utf-8 -*-

import random

class ShiftContainer:

  def __init__(self, frame, employees, list):
    if list == None:
      self.make_sample()
    else:
      self.list = list
    self.employees = employees
    self.frame = frame

  def make_sample(self):
    sample_list = []
    for num in range(len(self.frame) * len(self.employees)):
      sample_list.append(random.randint(0, 1))
    self.list = tuple(sample_list)

  def slice(self):
    sliced = []
    start = 0
    for num in range(len(self.employees)):
      sliced.append(self.list[start:(start + len(self.frame))])
      start = start + len(self.frame)
    return tuple(sliced)
