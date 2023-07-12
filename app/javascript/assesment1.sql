assesment 1
/* write your SQL query below */
select month, MonthToMonthChange
FROM (
  select month, monthTotal, (monthTotal - lag(monthTotal, 1) OVER ()) as MonthToMonthChange
  FROM (
    select monthnum, month, count(*) as monthTotal
    FROM (
      SELECT ID, MONTH(DateJoined) as monthnum, MONTHNAME(DateJoined) as month
      FROM maintable_Y9SHX
    ) as months group by monthnum, month
  ) as monthTotals order by monthnum 
) as monthChanges where MonthToMonthChange is not null