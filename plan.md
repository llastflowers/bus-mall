TECHNICAL PLAN

What pages need to be created?

1. main page with selection process
2. display results page

What data will need to be saved, updated, and when?

- inventory of products (api)
- choose three items to display (no duplicates)
- save selected item out of three (per cycle)
- remember three previous items to avoid repeating on next cycle
- track total number of selections to 25
- track items that were and were not viewed

What variables will need to be used to track data?

1. Array to store products (name, id, image, etc.)
2. Global variables:
   a. click counter
   b. track previous set of products to avoid dupes
   c. generate element for click event
   d. table of products
   e. table of selected products
   f. product votes
   g. products shown*
   h. product names
   i. max votes (25)

STRETCH: What data will need to be saved to local storage?

- final results data of multiple users

What rules exist and what algorithms (flow charts) need to be defined?

RULES: 
1. No duplicates in each selection (3)
2. No duplicates from a preceding set
3. 

FLOW CHARTS:
1. User chooses product > product selection is tracked >
2. next round > NEW three items appear
3. 1 and 2 loop to 25 >
4. 25 selections are made > further selections are disabled and results are displayed