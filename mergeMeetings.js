/* Given a list of booked meetings,
* find the times in the day when at least one meeting is taking place.
*
* For example, given:
* [
*   { start: 0,  end: 1 },
*   { start: 3,  end: 5 },
*   { start: 4,  end: 8 },
*   { start: 10, end: 12 },
*   { start: 9,  end: 10 }
* ]
*
* return:
* [
*   { start: 0, end: 1 },
*   { start: 3, end: 8 },
*   { start: 9, end: 12 }
* ]
*/

/*--------------------------*/

const mergeMeetings = meetings => {
  if (meetings.length === 1) return meetings;

  meetings.sort((a, b) => a.start - b.start);

  return meetings.slice(1).reduce(
    (mergedMeetings, meeting) => {
      const lastMergedMeeting = mergedMeetings[mergedMeetings.length - 1];
      if (meeting.start > lastMergedMeeting.end) return [...mergedMeetings, meeting];
      lastMergedMeeting.end = Math.max(lastMergedMeeting.end, meeting.end);
      return mergedMeetings;
    },
    [meetings[0]]
  );
};

/*--------------------------*/

// tests
const meetings = [
  { start: 0,  end: 1 },
  { start: 3,  end: 5 },
  { start: 4,  end: 8 },
  { start: 10, end: 12 },
  { start: 9,  end: 10 },
]

console.log(mergeMeetings(meetings));
