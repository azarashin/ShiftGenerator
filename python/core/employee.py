
class Employee(object):
  def __init__(self, no, wills):
    self.no = no
    self.wills = wills

  def is_applicated(self, slot_name):
    return (slot_name in self.wills)
