# -*- coding: utf-8 -*-

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

frame = ShiftFrame([
    ShiftSlot('mon_1', 2), 
    ShiftSlot('mon_2', 3), 
    ShiftSlot('mon_3', 3), 
    ShiftSlot('tue_1', 2), 
    ShiftSlot('tue_2', 3), 
    ShiftSlot('tue_3', 3), 
    ShiftSlot('wed_1', 2), 
    ShiftSlot('wed_2', 3), 
    ShiftSlot('wed_3', 3), 
    ShiftSlot('thu_1', 1), 
    ShiftSlot('thu_2', 2), 
    ShiftSlot('thu_3', 2), 
    ShiftSlot('fri_1', 2), 
    ShiftSlot('fri_2', 3), 
    ShiftSlot('fri_3', 3), 
    ShiftSlot('sat_1', 2), 
    ShiftSlot('sat_2', 4), 
    ShiftSlot('sat_3', 4), 
    ShiftSlot('sun_1', 2), 
    ShiftSlot('sun_2', 4), 
    ShiftSlot('sun_3', 4), 
])

class ManagableEmpleyee(Employee):
    def __init__(self, no, is_manager, wills):
        super().__init__(no, wills)
        self.manager = is_manager


e0 = ManagableEmpleyee(0, False, ['mon_1', 'tue_1', 'wed_1', 'thu_1', 'fri_1', 'sat_1', 'sun_1'])

# 月・水・金
e1 = ManagableEmpleyee(1, False, ['mon_1', 'mon_2', 'mon_3', 'wed_1', 'wed_2', 'wed_3','fri_1', 'fri_2', 'fri_3'])

# 週末だけ
e2 = ManagableEmpleyee(2, False, ['sat_1', 'sat_2', 'sat_3', 'sun_1', 'sun_2', 'sun_3'])

# どこでもOK
e3 = ManagableEmpleyee(3, True, ['mon_1', 'mon_2', 'mon_3',
                                     'tue_1', 'tue_2', 'tue_3',
                                     'wed_1', 'wed_2', 'wed_3',
                                     'thu_1', 'thu_2', 'thu_3',
                                     'fri_1', 'fri_2', 'fri_3',
                                     'sat_1', 'sat_2', 'sat_3',
                                     'sun_1', 'sun_2', 'sun_3'
                                    ])

# 夜だけ
e4 = ManagableEmpleyee(4, False, ['mon_3', 'tue_3', 'wed_3', 'thu_3', 'fri_3', 'sat_3', 'sun_3'])

# 平日のみ
e5 = ManagableEmpleyee(5, True, ['mon_1', 'mon_2', 'mon_3',
                                     'tue_1', 'tue_2', 'tue_3',
                                     'wed_1', 'wed_2', 'wed_3',
                                     'thu_1', 'thu_2', 'thu_3',
                                     'fri_1', 'fri_2', 'fri_3'
                                    ])

# 金土日
e6 = ManagableEmpleyee(6, False, ['fri_1', 'fri_2', 'fri_3',
                                     'sat_1', 'sat_2', 'sat_3',
                                     'sun_1', 'sun_2', 'sun_3'
                                    ])

# 昼のみ
e7 = ManagableEmpleyee(7, False, ['mon_2', 'tue_2', 'wed_2', 'thu_2', 'fri_2', 'sat_2', 'sun_2'])

# 夜のみ
e8 = ManagableEmpleyee(8, False, ['mon_3', 'tue_3', 'wed_3', 'thu_3', 'fri_3', 'sat_3', 'sun_3'])

# 木金土日
e9 = ManagableEmpleyee(9, True, ['thu_1', 'thu_2', 'thu_3',
                                     'fri_1', 'fri_2', 'fri_3',
                                     'sat_1', 'sat_2', 'sat_3',
                                     'sun_1', 'sun_2', 'sun_3'
                                    ])

employees = [e0, e1, e2, e3, e4, e5, e6, e7, e8, e9]


shift_generator = ShiftGenerator(
    [FewWorkStaff(), NoManagerSlot(), NotApplicatedAssign(), StaffDiffForIdealAndActual(), MaxSlotsInDay(3)], 
    (-10.0, -100.0, -1.0, -100.0, -10.0), 
    frame, employees
)

result = shift_generator.evlolve(300)

inspector = ShiftInspector()

print(inspector.print_csv(result))
print(inspector.print_tsv(result))
print(inspector.print_inspect(result))