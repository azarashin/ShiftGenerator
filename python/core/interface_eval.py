# -*- coding: utf-8 -*-

import abc

class IEval(metaclass=abc.ABCMeta):

  @abc.abstractmethod
  def eval(self, utility, container):
      pass


