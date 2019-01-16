const input = require('./input.js');
const Record = require('./Record.js');
const Guard = require('./Guard.js');

function sortInput() {
  const newInput = input.map(record => new Record(record));
  return newInput.sort(comparator);
}

function buildData() {
  const sortedInput = sortInput();
  let report;
  let guard;
  const guards = [];
  const guardIds = {};

  for (let i = 0; i < sortedInput.length; i++) {
    report = sortedInput[i]
    if (report.guardId && !guardIds[report.guardId]) {
      guard = new Guard(report);
      guardIds[report.guardId] = guard;
      guards.push(guard);
    } else if (report.guardId && guardIds[report.guardId]) {
      guard = guardIds[report.guardId];
      guard.addReport(report);
    } else {
      guard.addReport(report);
    }
  }

  return guards;
}

function sleepiestGuard() {
  const guards = buildData();
  let reports;
  let awokeAt;
  let asleepAt;
  let sleepiestGuard;

  guards.forEach((guard) => {
    reports = guard.reports;
    if (!sleepiestGuard) sleepiestGuard = guard;

    reports.forEach((report) => {
      if (report.description.match(/falls/)) {
        asleepAt = report.time;
      }

      if (report.description.match(/wakes/)) {
        awokeAt = report.time;
      }

      if (awokeAt && asleepAt) {
        guard.getTimeAsleep(asleepAt, awokeAt);
        awokeAt = null;
        asleepAt = null;
      }
    });

    // for answer to part 1: guard that is asleep the most, then sleepiestMinute
    // if (sleepiestGuard.timeAsleep < guard.timeAsleep) {
    //   sleepiestGuard = guard;
    // }
  });

  let highestFrequency = { minute: 0, frequency: 0 };
  let current;
  guards.forEach((guard) => {
    current = guard.getSleepiestMinuteFrequency();
    if (current.sleepiestMinuteFrequency > highestFrequency.frequency) {
      highestFrequency = { minute: current.sleepiestMinute, frequency: current.sleepiestMinuteFrequency };
      highestGuard = current;
    }
  });
// console.log('highestFrequency: ', highestFrequency);
  return highestFrequency.minute * highestGuard.id;
  // for answer to part 1: guard that is asleep the most, then sleepiestMinute
  // return sleepiestMinute(sleepiestGuard.minutesAsleepAt) * sleepiestGuard.id;
}

function sleepiestMinute(minutesAsleepAt) {
  let lazyMinute;

  Object.keys(minutesAsleepAt).forEach((key) => {
    if (!lazyMinute && lazyMinute !== 0) {
      lazyMinute = key;
    }

    if (minutesAsleepAt[key] > minutesAsleepAt[lazyMinute]) {
      lazyMinute = key;
    }
  });

  return lazyMinute;
}

function comparator(a, b) {
  return a.timestamp - b.timestamp;
}

// console.log(sortInput(input));
console.log(sleepiestGuard());
