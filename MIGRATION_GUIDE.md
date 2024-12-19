# Piano Bar Migration Guide: SvelteKit to Next.js

## Project Overview
- **Project Name**: Piano Bar
- **Purpose**: Live music request management system for pianists and their audiences
- **Migration**: From SvelteKit to Next.js
- **Location**: `/Users/zvineyard/pianobar-next`
- **Repository**: [Add GitHub repository if available]

## Core Features
1. **Authentication System**
   - Pianist login/registration
   - Password reset functionality
   - Session management
   - Protected routes

2. **Real-time Features**
   - Live queue updates
   - Pianist online status
   - Request notifications
   - Queue position updates

3. **Dashboard Features**
   - Request management
   - Queue control
   - Performance statistics
   - Profile management

4. **Audience Features**
   - Song request submission
   - Queue position tracking
   - Pianist availability status
   - Tip submission (planned)

## Project Structure
```
src/
├── app/
│   ├── layout.tsx         # Root layout with auth provider
│   ├── page.tsx          # Landing page
│   ├── login/            # Authentication pages
│   └── pianist/          # Protected routes
│       ├── dashboard/    # Pianist dashboard
│       └── requests/     # Request management
├── components/
│   └── queue/           # Queue-related components
├── lib/
│   ├── supabase.ts      # Supabase client
│   ├── types/           # TypeScript definitions
│   └── stores/          # State management
```

## Dependencies
```json
{
  "dependencies": {
    "next": "14.1.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "@supabase/supabase-js": "^2.47.7",
    "@supabase/auth-helpers-nextjs": "^0.9.0",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "tailwind-merge": "^2.5.5",
    "zod": "^3.24.1"
  }
}
```

## Environment Setup
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Schema
### Pianist Profiles
```typescript
interface PianistProfile {
  id: string;
  user_id: string;
  display_name: string;
  email: string;
  bio?: string;
  profile_image_url?: string;
  specialties?: string[];
  created_at: string;
  updated_at: string;
}
```

### Song Requests
```typescript
interface SongRequest {
  id: string;
  song_title: string;
  requester_name: string;
  created_at: string;
  status: 'pending' | 'accepted' | 'completed' | 'rejected';
  pianist_id: string;
  notes?: string;
  tip_amount?: number;
}
```

## Key Components to Implement

### Authentication
- Login form with password visibility toggle
- Password reset functionality
- Protected route middleware
- Session management

### Queue Management
- Real-time queue display
- Drag-and-drop reordering
- Status updates
- Request filtering

### Dashboard
- Request management interface
- Performance statistics
- Profile management
- Settings panel

## Real-time Features Implementation
```typescript
// Example of real-time queue subscription
const subscription = supabase
  .channel('requests')
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'requests' 
  }, payload => {
    console.log('Change received!', payload)
    fetchRequests()
  })
  .subscribe()
```

## Migration Priorities
1. Set up Next.js project structure ✅
2. Implement authentication system
3. Create protected routes
4. Migrate queue management
5. Implement dashboard features
6. Add real-time functionality
7. Migrate audience views
8. Implement tipping system

## Additional Considerations

### Security
- Implement proper authentication checks
- Add rate limiting
- Secure API routes
- Handle session timeouts

### Performance
- Implement proper caching
- Optimize real-time subscriptions
- Add loading states
- Handle offline scenarios

### UX Improvements
- Add proper error handling
- Implement loading states
- Add success/error notifications
- Improve form validations

## Testing Requirements
- Unit tests for components
- Integration tests for API routes
- E2E tests for critical flows
- Real-time functionality tests

## Future Enhancements
- Dark mode support
- Mobile responsiveness
- Offline support
- Analytics dashboard
- Multiple language support
- Custom themes for pianists

## Known Issues
- Port 3000 might be in use (fallback to 3001)
- Supabase auth helpers deprecation warning (needs update to @supabase/ssr)

## Helpful Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

## Contact
For any questions about the migration, please contact:
- Project Owner: [Add contact information]
- Technical Lead: [Add contact information] 