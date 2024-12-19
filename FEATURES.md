# Piano Bar Request System Features

## Song Request Handling

### Multiple Song Requests
When an audience member submits multiple songs:
1. All songs from the same requester are grouped on a single card
2. Songs are grouped by requester name and submission timestamp
3. When one song is selected:
   - The selected song moves to the queue
   - Other songs from the same requester are automatically marked as completed
   - The completed songs disappear from the pending requests area

### Implementation Details
- Grouping is handled in `loadRequests()` function in `src/routes/pianist/dashboard/+page.svelte`
- Selection and cleanup is handled in `claimRequest()` function
- Database updates use Supabase real-time subscriptions for instant updates

### Database Schema
```typescript
interface SongRequest {
  id: string;
  show_id: string;
  song_title: string;
  artist: string | null;
  requested_by: string;
  dedication: string | null;
  tip_amount: number;
  created_at: string;
  claimed_at: string | null;
  completed_at: string | null;
  claimed_by: string | null;
  status: 'pending' | 'claimed' | 'completed';
  queue_position: number | null;
}
```

## Queue Management

### Request States
1. Pending: New requests that haven't been claimed
2. Claimed: Songs added to the queue but not yet played
3. Completed: Songs that have been played
4. Automatically Completed: Other songs from same requester when one is selected

### Real-time Updates
- Uses Supabase real-time subscriptions
- Updates are instant across all connected clients
- Queue position changes are persisted to database

## Show Management

### Show States
1. No Active Show: Dashboard shows placeholder
2. Active Show: Full request management interface
3. Ended Show: Moves to history with statistics

### Statistics Tracking
- Total requests
- Songs played
- Tips received
- Show duration
- Peak request times

## Important Code Sections

### Request Grouping Logic
```typescript
// In loadRequests():
const groupedPending = new Map<string, SongRequest[]>();
pendingData?.forEach((request: any) => {
  const timestamp = new Date(request.created_at).toISOString().split('.')[0];
  const key = `${request.requested_by}_${timestamp}`;
  if (!groupedPending.has(key)) {
    groupedPending.set(key, []);
  }
  groupedPending.get(key)?.push(request);
});
```

### Request Selection Logic
```typescript
// In claimRequest():
// First, claim the selected request
const { error: claimError } = await supabase
  .from('song_requests')
  .update({
    claimed_by: (await supabase.auth.getUser()).data.user?.id,
    claimed_at: new Date().toISOString(),
    queue_position: requests.length + 1
  })
  .eq('id', selectedRequest.id);

// Mark all other requests from the same group as completed
const otherRequests = groupedRequests.filter(r => r.id !== selectedRequest.id);
if (otherRequests.length > 0) {
  await supabase
    .from('song_requests')
    .update({ 
      completed_at: new Date().toISOString(),
      claimed_at: new Date().toISOString()
    })
    .in('id', otherRequests.map(r => r.id));
}
```

## Testing New Changes

When making changes that affect request handling:
1. Test submitting multiple requests from same user
2. Verify requests appear on single card
3. Test selecting one request
4. Verify other requests disappear correctly
5. Check database for proper status updates 