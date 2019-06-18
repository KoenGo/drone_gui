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


# while 1:
#     for nums in gen_motor_values(4):
#         line = ','.join([str(i) for i in nums])
#         with open('dat.txt', 'w') as f:
#             f.write(line)
#         time.sleep(0.05)
def gen_data():
    with open('term.txt') as f:
        lines = f.readlines()
        i = 0
        while 1:
            while i < len(lines):
                yield lines[i]
                i += 1
            while i > 0:
                i -= 1
                yield lines[i]


while 1:
    for d in gen_data():
        with open('dat.txt', 'w') as f:
            f.write(d)
        time.sleep(0.1)


