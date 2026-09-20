# Build the Aged Ticket Reporter

This guide follows the demonstrated routing logic. Email wording and styling can be customized. The included sample has 12 fictional tickets and four owners; three reports were generated and delivered to the creator’s own inbox. Sam’s empty report was skipped.


The action names below are exact. Rename actions before pasting expressions that refer to them. Use the Expression / fx editor without a leading `@`, except where the Filter array advanced-mode example explicitly includes it.

## Layout

```text
Manually trigger a flow
  List_owners (table EMAILS)
  List_tickets (table DATA)
  For_each_owner (value from List_owners)
    Filter_owner_tickets (value from List_tickets)
    Has_tickets
      Yes:
        Create_ticket_table
        Style_ticket_table
        Compose_email_preview
        [After preview testing] Send_demo_email
      No: do nothing
```

## 1. Read EMAILS

Add **Excel Online (Business) → List rows present in a table**, named **List_owners**.

Choose your OneDrive for Business or SharePoint location, document library, the uploaded `Aged-Ticket-Demo.xlsx`, and table **EMAILS**. Leave Filter Query, Order By, and Top Count empty.

EMAILS contains one column: `SITE_USER_ASSIGNED_EMAIL`. Each nonblank email must appear once. Remove blank recipients before running; duplicate recipients would repeat a report.

## 2. Read DATA

Add a second **List rows present in a table**, named **List_tickets**. Select the same file and table **DATA**. Leave Filter Query, Order By, and Top Count empty.

The table columns, in order, are:

```text
TICKET_ID
DATETIME_CREATED
LAST_ACTIVITY_DT
TICKET_STATUS_CD
SITE_USER_ASSIGNED
TICKET_REASON_NAME
CURRENTLY_OPEN_TIME_OPEN
SITE_USER_ASSIGNED_EMAIL
```

The sample dates are text, as in the supplied work file, so no Date Time Format conversion is needed. Keep the table mapping below as a direct pass-through instead of calling formatDateTime on unknown text formats.

For larger extracts, turn on **Pagination** in each Excel action's Settings and set a threshold above the expected row count, such as 5000. Without pagination the connector normally returns up to 256 rows. This starter contains 12 ticket rows and 4 recipient rows.

## 3. Loop over recipient emails

Add **Apply to each**, named **For_each_owner**. Input:

```text
body('List_owners')?['value']
```

This is **value from List_owners**, not List_tickets. Keep loop concurrency off while testing.

## 4. Match each recipient's tickets

Inside the loop, add **Filter array**, named **Filter_owner_tickets**.

From:

```text
body('List_tickets')?['value']
```

Filter in advanced mode:

```text
@equals(item()?['SITE_USER_ASSIGNED_EMAIL'], items('For_each_owner')?['SITE_USER_ASSIGNED_EMAIL'])
```

Use the advanced-mode box for this expression. `item()` is a DATA ticket row; `items('For_each_owner')` is an EMAILS recipient row. This tested version uses exact email matching. Keep email capitalization and spacing consistent in both tables. Ensure EMAILS contains unique, nonblank keys.

There is deliberately no age or status test. Every matched row is included with its original status and decimal age. Any later eligibility rules should be based on confirmed business requirements.

## 5. Skip recipients with no rows

Add **Condition**, named **Has_tickets**:

- Left, Expression: `length(body('Filter_owner_tickets'))`
- Operator: **is greater than**
- Right: numeric `0`

Put the remaining actions inside **Yes / True**. Leave **No / False** empty.

## 6. Create the report table

Inside Yes, add **Create HTML table**, named **Create_ticket_table**.

From:

```text
body('Filter_owner_tickets')
```

Choose **Custom** columns. Enter each value through **Expression / fx**:

| Header | Value expression |
| --- | --- |
| Ticket number | `item()?['TICKET_ID']` |
| Status | `item()?['TICKET_STATUS_CD']` |
| Assigned to | `item()?['SITE_USER_ASSIGNED']` |
| Reason | `item()?['TICKET_REASON_NAME']` |
| Days open (reported) | `item()?['CURRENTLY_OPEN_TIME_OPEN']` |
| Created | `item()?['DATETIME_CREATED']` |
| Last activity | `item()?['LAST_ACTIVITY_DT']` |

The Days open label follows your screenshot's original report heading. Values are passed through without rounding, truncation, or recalculating them from dates. Because Excel is numeric, a trailing zero may not appear in the email (7.50 and 7.5 are the same value).

Do not select the entire Excel column token as a custom value. Using `item()` avoids creating an extra loop. An HTML table for the EMAILS row is not needed.

## 7. Style the table

Add **Compose**, named **Style_ticket_table**, with this expression:

```text
replace(
  replace(
    replace(
      body('Create_ticket_table'),
      '<table>',
      '<table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:13px;">'
    ),
    '<th>',
    '<th style="padding:10px;text-align:left;background:#172638;color:#ffffff;border-bottom:1px solid #dbe3dd;">'
  ),
  '<td>',
  '<td style="padding:10px;text-align:left;vertical-align:top;border-bottom:1px solid #dbe3dd;">'
)
```

## 8. Prepare the report preview

Add **Compose**, named **Compose_email_preview**:

```text
concat(
  '<div style="font-family:Arial,sans-serif;color:#172638;padding:24px;">',
  '<p style="font-size:11px;color:#2f7157;letter-spacing:1px;">PORTFOLIO DEMO — SYNTHETIC DATA</p>',
  '<h2 style="font-size:22px;margin:16px 0;">Aged ticket report</h2>',
  '<p style="font-size:14px;line-height:1.6;">The supplied report contains ',
  string(length(body('Filter_owner_tickets'))),
  ' ticket(s) assigned to this recipient. Review each ticket and record the next action.</p>',
  outputs('Style_ticket_table'),
  '<p style="font-size:12px;color:#586773;margin-top:24px;">Jias Vidal — sample support automation project. All ticket records are fictional.</p>',
  '</div>'
)
```

The table output goes directly inside the outer div; do not nest it inside another table or a paragraph.

## 9. Test without sending

Save and run manually. Inspect each loop iteration and the filter/condition outputs in run history.

| Recipient | Expected rows | Preview |
| --- | --- | --- |
| alex.carter@example.com | DEMO-1001 through DEMO-1004 | 4 tickets |
| morgan.lee@example.com | DEMO-1005 through DEMO-1008 | 4 tickets |
| sam.rivera@example.com | None | Skipped |
| taylor.brooks@example.com | DEMO-1009 through DEMO-1012 | 4 tickets |

Expected total: **three reports, all 12 ticket rows exactly once**. Check that INPROG, Awaiting Information, Pending Review, and ages below seven are present. An unmatched ticket email would be omitted because no recipient loop exists for it; check all DATA emails are represented in EMAILS before using a new extract.

## 10. Add email delivery to yourself

Once the previews match, add **Office 365 Outlook → Send an email (V2)** inside Yes, after the preview. Name it **Send_demo_email**.

- **To:** type your own Microsoft 365 mailbox address as a fixed value. The example.com addresses are matching keys, not delivery destinations.
- **Subject**, Expression:

```text
concat('[DEMO] Aged ticket report - ', items('For_each_owner')?['SITE_USER_ASSIGNED_EMAIL'])
```

- **Body:** Outputs from Compose_email_preview. Use the body's HTML/code view if offered by your designer.
- Leave CC and BCC empty.

Run once and inspect the three emails in your own mailbox. There is no OwnerName field in EMAILS, so the subject uses the recipient key. Keep the trigger manual for this demonstration. Each new run sends another report set; this starter does not track previous sends or guarantee exactly-once email delivery.

For a future authorized rollout with real recipient data, the direct To expression would be `items('For_each_owner')?['SITE_USER_ASSIGNED_EMAIL']`. Do not use it with the fictional addresses in this demo.

## If something is wrong

- **Old field names still appear:** re-select the revised workbook and table in both Excel actions; replace any stale dynamic tokens.
- **Repeated full reports:** loop over EMAILS, not DATA, and remove duplicate recipient keys.
- **All tickets in every report:** compare the DATA `item()` email against the outer loop `items('For_each_owner')` email.
- **Missing INPROG or younger tickets:** remove the old status/age checks.
- **Truncated ages:** remove `int()` or rounding from the age mapping.
- **Date parsing errors:** map the text date fields directly; remove the previous formatDateTime expressions.
- **Extra recipient loop:** use the explicit table expressions and a single fixed test email address.
- **Missing rows in a larger file:** check pagination, blank emails, and recipient coverage.

After a successful cloud run, record a short demonstration and link the video or write-up from your portfolio. This sample does not measure the 3–5 hours/week benefit reported for your separate work project.
