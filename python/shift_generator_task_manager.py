# -*- coding: utf-8 -*-

import threading

from core.shift_generator import ShiftGenerator
from core.shift_slot import ShiftSlot
from core.shift_frame import ShiftFrame
from core.employee import Employee
from core.shift_inspector import ShiftInspector

from sample_evaluators.few_work_staff import FewWorkStaff
from sample_evaluators.no_manager_slot import NoManagerSlot
from sample_evaluators.not_applicated_assign import NotApplicatedAssign
from sample_evaluators.staff_diff_for_ideal_and_actual import StaffDiffForIdealAndActual
from sample_evaluators.max_slots_in_day import MaxSlotsInDay


class ManagableEmpleyee(Employee):
    def __init__(self, no, is_manager, name, wills):
        super().__init__(no, wills)
        self.manager = is_manager
        self.name = name
        self.wills = wills
        
    def __str__(self):
        return '{}: {}'.format(self.name, self.wills)

class ShiftGeneratorTaskManager:
    def __init__(self):
        self.staff_slots = None
        self.required = None
        self.conditions = None
        self.thread = None
        self.json = None
        self.names = None
        self.try_max = 100
        self.progress = 0
        
    def generate_shift(self, names, staff_slots, required, conditions): 
        if(self.thread):
            return False
        self.working = True
        self.names = names
        self.staff_slots = staff_slots
        self.required = required
        self.conditions = conditions
        print('go')
        self.thread = threading.Thread(target=self.task)
        self.thread.start()
        return True
    
    def get_result(self):
        return self.progress / self.try_max, self.json
        
    def task(self):
        print('gogo')
        staff_slots = self.staff_slots
        required = self.required
        conditions = self.conditions

        slot_ids = [d['slot_id'] for d in required]
        slots = [ShiftSlot(d['slot_id'], int(d['required'])) for d in required]
        print([str(d) for d in slots])
        frame = ShiftFrame(slots)
        staffs = [ManagableEmpleyee(i, False, staff_slots[i]['name'], 
            [d for d in staff_slots[i]['slots'] if d in slot_ids]) for i in range(len(staff_slots))]
        print([str(d) for d in staffs])

        shift_generator = ShiftGenerator(
            [FewWorkStaff(), NoManagerSlot(), NotApplicatedAssign(), StaffDiffForIdealAndActual(), MaxSlotsInDay(3)], 
            (-10.0, -100.0, -1.0, -100.0, -10.0), 
            frame, staffs
        )

        inspector = ShiftInspector()

        self.progress = 0
        for i in range(self.try_max):
            result = shift_generator.evlolve(1)
            self.progress = i + 1
            self.json = inspector.get_json(result, self.names)
            if(i % 10 == 0):
                print(self.json)


        print(inspector.print_inspect(result))
        self.thread = None

        