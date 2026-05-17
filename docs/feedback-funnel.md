# Feedback Funnel

This funnel is designed for low social pressure beta validation. The goal is to let people understand, download, try, and respond without requiring the author to do heavy private outreach, video calls, or live demos.

## No-Face Beta Flow

```text
GitHub Release
  -> Beta landing page
  -> Portable ZIP download
  -> 3-day personal trial
  -> Feedback form
  -> Feedback analysis
```

## Step 1: GitHub Release

Use the GitHub Release as the source of truth for the beta build.

Release page should include:

- Clear beta label.
- Portable ZIP asset.
- Short description of what Task Calendar does.
- Known limitations.
- Live beta feedback link: `https://wj.qq.com/s2/26709573/338b/`.

## Step 2: Beta Landing Page

The beta landing page should explain the product in plain language:

- What it is.
- Who it is for.
- What problem it solves.
- How to download.
- Where data is stored.
- How to give feedback.

It should not claim Task Calendar is production-ready or commercially available.

## Step 3: Download

The download path should be simple:

1. Open the GitHub Release.
2. Download the portable ZIP.
3. Extract it to a normal folder.
4. Run `TaskCalendar.exe`.

Make it clear that the current Windows app is unsigned and may show a trust warning.

## Step 4: 3-Day Trial

Ask testers to use Task Calendar for 3 normal workdays.

Suggested trial tasks:

- Start blank or import a small task list.
- Check Today Command Center each morning.
- Use Today Action List during the day.
- Use End-of-Day Review at the end of the day.
- Try Data & Settings, Export backup, and Restore from JSON if comfortable.

## Step 5: Feedback Form

The feedback form should focus on whether the product is valuable, not whether users like every detail.

Important questions:

- Did it help you know what to do first?
- Did it reduce daily task confusion?
- Did local-first/no-account matter?
- What blocked daily use?
- Would you keep using it?
- Would you pay for a stable local version?

## Success Criteria

v0.7.0 beta validation is useful if:

- 5-10 testers download or try the app.
- At least 3 people use it for 3 days.
- At least 2 people say they would keep using it.
- 1-2 people express real willingness to pay.
- At least 1 tester explains the value in their own words.

## Review Rhythm

After each small batch of testers:

1. Add feedback to `feedback-analysis-template.md`.
2. Score the feedback.
3. Identify repeated blockers.
4. Decide whether the next release should improve product trust, usability, or distribution.

Do not build payment, accounts, cloud sync, or subscriptions until the beta signal is clear.
