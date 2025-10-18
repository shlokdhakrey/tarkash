# 👨‍💼 Admin Quick Reference

## 🔐 Default Admin Credentials

**⚠️ CRITICAL: Change these immediately after first login!**

```
Email: admin@innovatex2025.edu
Password: Admin123!
```

## 🎯 Admin Capabilities (When Implemented)

### Dashboard
- View registration statistics
- Monitor team submissions
- Track judging progress
- View real-time analytics

### Team Management
- Approve/reject team registrations
- Edit team information
- View team member details
- Send messages to teams

### Judge Management
- Create judge accounts
- Assign submissions to judges
- Monitor scoring progress
- Configure rubric weights

### Submissions
- View all submissions
- Download project files
- Mark finalists
- Toggle blind/unblind mode

### Content Management
- Create announcements
- Edit timeline events
- Manage FAQs
- Update sponsor information

### Exports
- Export registrations to CSV
- Export scores to Excel
- Download team lists
- Generate reports

### Communication
- Send broadcast emails
- Create targeted announcements
- Message specific teams
- Push notifications

---

## 📊 Key Metrics to Monitor

- **Total Teams Registered**
- **Pending Approvals**
- **Submissions Received**
- **Judging Completion %**
- **Daily Registration Trend**
- **Top Institutes**

---

## 🔧 Common Admin Tasks

### Approve a Team
1. Navigate to Teams section
2. Find pending team
3. Review details
4. Click "Approve" or "Reject"
5. Optionally add reason for rejection

### Assign Judges to Submissions
1. Go to Judging section
2. Select batch of submissions
3. Choose judges to assign
4. Set blind mode preference
5. Send notification

### Create Announcement
1. Go to Announcements
2. Click "New Announcement"
3. Set priority level
4. Choose audience (all/teams/judges)
5. Publish

### Export Data
1. Navigate to relevant section
2. Apply filters if needed
3. Click "Export"
4. Choose format (CSV/Excel)
5. Download file

---

## 🚨 Emergency Actions

### Reset User Password
```
Contact technical team or use admin API endpoint
POST /api/admin/users/:id/reset-password
```

### Extend Submission Deadline
1. Go to Settings
2. Find "Submission Deadline"
3. Update date/time
4. Save and announce

### Disable Registration
1. Go to Settings
2. Toggle "Registration Open"
3. Save changes

---

## 📞 Support Contacts

**Technical Issues:**
- Email: tech@innovatex2025.edu
- Phone: +91-XXXX-XXXXXX

**Security Concerns:**
- Email: security@innovatex2025.edu
- Emergency: +91-XXXX-XXXXXX (24/7)

---

## 🔒 Security Best Practices

1. **Change default password immediately**
2. **Use strong, unique password**
3. **Enable 2FA if available**
4. **Don't share admin credentials**
5. **Log out after use**
6. **Review audit logs regularly**
7. **Report suspicious activity**

---

## 📝 Database Access (Prisma Studio)

**For Development Only:**

```bash
pnpm prisma:studio
```

Opens: http://localhost:5555

**⚠️ Never use in production without VPN/firewall!**

---

## 🎓 Quick Wins for First Week

- [ ] Change admin password
- [ ] Review and approve pending teams
- [ ] Set up judge accounts
- [ ] Test email notifications
- [ ] Verify file upload limits
- [ ] Check timeline accuracy
- [ ] Update sponsor logos
- [ ] Test CSV export
- [ ] Configure rubric weights
- [ ] Create welcome announcement

---

Last Updated: 2025-01-15  
Version: 0.1.0
