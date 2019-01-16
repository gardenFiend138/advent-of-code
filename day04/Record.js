class Record {
  constructor(record) {
    // this.year = Number(record.slice(1, 5));
    // this.month = Number(record.slice(6, 8));
    // this.day = Number(record.slice(9, 11));
    // this.hour = Number(record.slice(12, 14));
    this.date = record.match(/\d{4}-\d{2}-\d{2}/)[0];
    // this.minute = Number(record.slice(15, 17));
    this.time = record.match(/\d{2}:\d{2}/)[0];
    this.description = record.slice(19);
    this.timestamp = this.getTimestamp(record);
    this.guardId = this.getGuardNumber(this.description);
    this.record = record;
  }

  getTimestamp(record) {
    let result = '';

    record.slice(1, 17).split('').forEach((char) => {
      if (!!Number(char) || char === '0') {
        result += char;
      }
    });

    return Number(result);
  }

  getGuardNumber(description) {
    const matchId = description.match(/\d+/);
    return matchId ? +matchId[0] : null;
  }
}

module.exports = Record;
