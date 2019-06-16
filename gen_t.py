import time

MAX = 750
MIN = 0


def gen_motor_values(step):
    nums = [MIN] * 4
    while 1:
        while nums[0] + step < MAX:
            for i, num in enumerate(nums):
                nums[i] += step
            yield nums

        while nums[0] - step > MIN:
            for i, num in enumerate(nums):
                nums[i] -= step
            yield nums


while 1:
    for nums in gen_motor_values(4):
        line = ','.join([str(i) for i in nums])
        with open('dat.txt', 'w') as f:
            f.write(line)
        with open('static/dat.txt', 'w') as f:
            f.write(line)
        time.sleep(0.05)
