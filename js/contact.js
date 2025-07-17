// contact.js - WhatsApp form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Format the WhatsApp message
            const whatsappMessage = `New Contact Inquiry%0A%0A` +
                                   `*Name:* ${name}%0A` +
                                   `*Email:* ${email}%0A` +
                                   `*Phone:* ${phone}%0A` +
                                   `*Subject:* ${subject}%0A` +
                                   `*Message:* ${message}`;
            
            // Replace with your WhatsApp number (with country code, remove +)
            const whatsappNumber = '923006297028';
            
            // Open WhatsApp with the pre-filled message
            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
            
            // Optional: Reset form after submission
            contactForm.reset();
        });
    }
});