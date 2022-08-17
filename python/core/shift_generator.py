# -*- coding: utf-8 -*-
import random

from scoop import futures

from deap import base
from deap import creator
from deap import tools
from deap import cma

from .eval_utility import EvalUtility
from .shift_container import ShiftContainer

class ShiftGenerator(object):

    def __init__(self, evals, weights, frame, employees):
        self._evals = evals
        self._frame = frame
        self._employees = employees
        self._utility = EvalUtility()
        
        creator.create("FitnessPeopleCount", base.Fitness, weights=weights)
        creator.create("Individual", list, fitness=creator.FitnessPeopleCount)

        self._toolbox = base.Toolbox()

        self._toolbox.register("map", futures.map)

        self._toolbox.register("attr_bool", random.randint, 0, 1)
        self._toolbox.register("individual", tools.initRepeat, creator.Individual, self._toolbox.attr_bool, len(frame.slots) * len(employees))
        self._toolbox.register("population", tools.initRepeat, list, self._toolbox.individual)
        
        self._toolbox.register("evaluate", self._evalShift)
        # 交叉関数を定義(二点交叉)
        self._toolbox.register("mate", tools.cxTwoPoint)

        # 変異関数を定義(ビット反転、変異隔離が5%ということ?)
        self._toolbox.register("mutate", tools.mutFlipBit, indpb=0.05)

        # 選択関数を定義(トーナメント選択、tournsizeはトーナメントの数？)
        self._toolbox.register("select", tools.selTournament, tournsize=3)

        # 初期集団を生成する
        self._pop = self._toolbox.population(n=300)
        self._best_ind = tools.selBest(self._pop, 1)[0]

        print("進化開始")

        # 初期集団の個体を評価する
        fitnesses = list(map(self._toolbox.evaluate, self._pop))
        for ind, fit in zip(self._pop, fitnesses):  # zipは複数変数の同時ループ
            # 適合性をセットする
            ind.fitness.values = fit

        print("  %i の個体を評価" % len(self._pop))


    # 進化計算のループ回数、交差確率、突然変異確率
    def evlolve(self, ngen=1, cross_probability = 0.6, mutation_probability = 0.5):
        # 進化計算開始
        for g in range(ngen):
            # 選択
            # 次世代の個体群を選択
            offspring = self._toolbox.select(self._pop, len(self._pop))
            # 個体群のクローンを生成
            offspring = list(map(self._toolbox.clone, offspring))

            # 選択した個体群に交差と突然変異を適応する

            # 交叉
            # 偶数番目と奇数番目の個体を取り出して交差
            for child1, child2 in zip(offspring[::2], offspring[1::2]):
                if random.random() < cross_probability:
                    self._toolbox.mate(child1, child2)
                    # 交叉された個体の適合度を削除する
                    del child1.fitness.values
                    del child2.fitness.values

            # 変異
            for mutant in offspring:
                if random.random() < mutation_probability:
                    self._toolbox.mutate(mutant)
                    del mutant.fitness.values

            # 適合度が計算されていない個体を集めて適合度を計算
            invalid_ind = [ind for ind in offspring if not ind.fitness.valid]
            fitnesses = map(self._toolbox.evaluate, invalid_ind)
            for ind, fit in zip(invalid_ind, fitnesses):
                ind.fitness.values = fit

            print("  %i の個体を評価" % len(invalid_ind))

            # 次世代群をoffspringにする
            self._pop[:] = offspring

            # すべての個体の適合度を配列にする
            index = 1
            for v in ind.fitness.values:
                fits = [v for ind in self._pop]

            length = len(self._pop)
            mean = sum(fits) / length
            sum2 = sum(x*x for x in fits)
            std = abs(sum2 / length - mean**2)**0.5

            print("* パラメータ%d" % index)
            print("  Min %s" % min(fits))
            print("  Max %s" % max(fits))
            print("  Avg %s" % mean)
            print("  Std %s" % std)
            index += 1

        print("-- 進化終了 --")

        self._best_ind = tools.selBest(self._pop, 1)[0]
        print("最も優れていた個体: %s, %s" % (self._best_ind, self._best_ind.fitness.values))
        return ShiftContainer(self._frame, self._employees, self._best_ind)
        
    def _evalShift(self, individual):
        container = ShiftContainer(self._frame, self._employees, individual)
        return ([d.eval(self._utility, container) for d in self._evals])

