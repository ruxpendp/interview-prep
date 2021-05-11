/*
* Given a list of booked meetings,
* find the times in the day when at least one meeting is taking place.
*
* For example, given:
* [
*   { start: 0, end: 1 },
*   { start: 3, end: 5 },
*   { start: 4, end: 8 },
*   { start: 10, end: 12 },
*   { start: 9, end: 10 }
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
  if (meetings.length <= 1) return meetings;

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

/*--------------------------*/

/*
* Commentary:
* The crux is definitely realizing you can take a greedy approach and do this in one pass if you
* sort the meetings first. From there the actual merging gets kind of trivial.
*
* I quite like this problem as an entry-level or just-beyond-entry-level coding interview problem
* because I think it gives a lot of signal as to who *actually* has facility with coding and/or a
* programming language, if that kind of signal is important to you as an interviewer. If you've put
* in some real coding time you will likely know how to call a sort on your array as well as take
* the max of two numbers in your language of choice like the back of your hand without having to
* ask your interviewer. I also know that at my (full-stack webdev) job I was *constantly* having to
* sort and reduce arrays of user data etc. so the solution to this problem came very instinctively
* and you might expect someone of similar background not to struggle with this problem.
*
* A note about array.slice and array.reduce: Yes, I know that using a manual for-loop starting at
* index 1 and array.push'ing meetings would save about n cycles vs. having to copy the array with
* slice. But when I do coding problems I like to imagine that I was actually implementing a feature
* at my real job – and at my real job, declarative programming is massively more maintainable,
* debuggable, and refactorable than imperative programming (why this is is a topic for another day).
* Javascript can process a list like this with 100000 entries in miliseconds anyway, and so as long
* as you don't change big-O efficiency, in a webapp the performance bottleneck will always
* overwhelmingly come from network request latency, not your extra array pass-through. Trading a
* negligible (and I mean negligible) performance hit in exchange for code
* clarity/safety/maintainability etc. is worth it many times over, and pointing out and explaining
* this decision could be an opportunity to show your knowledge and aptitude for the role (even if
* your interviewer might not have made the same decision! But of course context is key; if you're
* going to be implementing credit card payment processing or working some other area where
* incremental performance gains are important, maybe stick with the manual for-loop!).
*/
