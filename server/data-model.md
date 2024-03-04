# Data Model

This is the model for all the entities, their fields, and how they will be interacting with one another. I will not be using a SQL database for this project, so my model does not need to conform to SQL norms.

## Users
**Fields**
- Name
- Email
- Type (e.g., Guest, Member, or Entity Owner)
- Phone Number
- Bookings (array of references)

## Bookings
**Fields**
- Date
- Hotel (reference)
- Payment Method
- Room (reference from Hotels)
- Number of Guests
- User (reference)

## Hotels
**Fields**
- Address
- Owner (e.g., Hilton, Marriott, etc.)
- Phone Number
- Average Rating (pseudo-field)
- Availability (pseudo-field)
- Amenities (array)
- Rooms (array of room references)

## Rooms
**Fields**
- beds
- rate
- room number
- Image (string)

## Reviews
**Fields**
- Hotel (reference)
- User (reference)
- Points (out of 10)
- Text

