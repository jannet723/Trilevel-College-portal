const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  const msg = {
    to: user.email,
    from: 'no-reply@trilevel.college',
    subject: 'Welcome to Trilevel College Portal',
    text: `Welcome ${user.displayName || ''} — your account has been created.`,
    html: `<p>Welcome ${user.displayName || ''} — your account has been created.</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Welcome email sent to', user.email);
  } catch (err) {
    console.error('Error sending welcome email', err);
  }
});

exports.sendEnrollmentEmail = functions.firestore.document('enrollments/{enrollmentId}').onCreate(async (snap, context) => {
  const enrollment = snap.data();
  const studentEmail = enrollment.studentEmail || null;
  const studentName = enrollment.studentName || 'Student';
  const courseTitle = enrollment.courseTitle || 'your selected course';

  if (!studentEmail) {
    console.warn('Enrollment created without studentEmail:', context.params.enrollmentId);
    return null;
  }

  const msg = {
    to: studentEmail,
    from: 'no-reply@trilevel.college',
    subject: `Enrollment request received for ${courseTitle}`,
    text: `Hi ${studentName},\n\nYour enrollment request for ${courseTitle} has been received. We will update your dashboard once the course is confirmed.\n\nThank you for choosing Trilevel College Portal.`,
    html: `<p>Hi ${studentName},</p><p>Your enrollment request for <strong>${courseTitle}</strong> has been received.</p><p>We will update your dashboard once the course is confirmed.</p><p>Thank you for choosing Trilevel College Portal.</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Enrollment email sent to', studentEmail);
  } catch (err) {
    console.error('Error sending enrollment email', err);
  }
});
