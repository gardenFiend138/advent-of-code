function timeInMinutes(time) {
  const [hours, minutes] = time.split(':');
  let totalMinutes = 0;
  totalMinutes += +minutes;
  totalMinutes += (+hours * 60);

  return totalMinutes;
}

class Guard {
  constructor(report) {
    this.id = this.getId(report.description);
    this.reports = [report];
    this.timeAsleep = 0;
    this.minutesAsleepAt = {};
    this.sleepiestMinuteFrequency = null;
  }

  getId(report) {
    const matchId = report.match(/\d+/);
    return matchId ? +matchId[0] : null;
  }

  addReport(report) {
    this.reports.push(report);
  }

  reportTimeAsleep(minutes) {
    this.timeAsleep += minutes;
  }

  // [1518-09-21 23:59] asleep
  // [1518-09-21 00:09] awake
  getTimeAsleep(sleep, wake) {
    let timeAsleep = 0;
    const asleepAt = timeInMinutes(sleep);
    const awakeAt = timeInMinutes(wake);
    const minutesAsleepAt = {}; // key = minute (0..60); value = count

    if (asleepAt > awakeAt) {
      // turns out didn't have to flesh out this logic here; there were no
      // instances of a guard sleeping at 'midnight'
      timeAsleep += timeInMinutes('24:00') - asleepAt;
      timeAsleep += awakeAt;
    } else {
      timeAsleep = timeInMinutes(wake) - timeInMinutes(sleep);
    }
    this.reportTimeAsleep(timeAsleep);
    this.setMinutesAsleepAt(awakeAt, asleepAt);
  }

  setMinutesAsleepAt(awokeAt, asleepAt) {
    for (let i = asleepAt; i < awokeAt; i++) {
      this.minutesAsleepAt[i] = this.minutesAsleepAt[i] ? this.minutesAsleepAt[i] += 1 : 1;
    }
  }

  getSleepiestMinuteFrequency() {
    let sleepiestMinute;

    Object.keys(this.minutesAsleepAt).forEach((min) => {
      if (!sleepiestMinute && sleepiestMinute !== 0) {
        sleepiestMinute = min;
      }

      if (this.minutesAsleepAt[min] > this.minutesAsleepAt[sleepiestMinute]) {
        sleepiestMinute = min;
      }
    });

    this.sleepiestMinuteFrequency = this.minutesAsleepAt[sleepiestMinute];
    this.sleepiestMinute = sleepiestMinute;
    return this;
  }
}

module.exports = Guard;
