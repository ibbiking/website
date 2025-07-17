$(document).ready(function() {
    // Product gallery thumbnail click
    $('.thumbnail-gallery img').click(function() {
        const mainImg = $(this).attr('src').replace('-thumb', '-large');
        $('#zoom-image').attr('src', mainImg);
    });

    // Quantity selector
    $('.qty-plus').click(function() {
        const input = $(this).siblings('.qty-input');
        input.val(parseInt(input.val()) + 1);
    });

    $('.qty-minus').click(function() {
        const input = $(this).siblings('.qty-input');
        if (parseInt(input.val()) > 1) {
            input.val(parseInt(input.val()) - 1);
        }
    });

    // Tabs functionality
    $('.tab-btn').click(function() {
        const tabId = $(this).data('tab');
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        $('.tab-pane').removeClass('active');
        $('#' + tabId).addClass('active');
    });

    // WhatsApp order
    $('#whatsappOrderBtn').click(function() {
        const productName = $('h1').text().trim();
        const quantity = $('.qty-input').val();
        sendWhatsAppOrder(productName, quantity);
    });

    // Order form
    $('.order-form-btn').click(function() {
        const productName = $('h1').text().trim();
        $('#popupProductName').val(productName);
        $('#orderPopup').addClass('active');
    });

    // Close popup
    $('.close-popup').click(function() {
        $('#orderPopup').removeClass('active');
    });

    // Submit order form
    $('#orderForm').submit(function(e) {
        e.preventDefault();
        const productName = $('#popupProductName').val();
        const quantity = $('#quantity').val();
        const customerName = $('#customerName').val();
        const address = $('#address').val();
        const city = $('#city').val();
        
        sendWhatsAppOrder(productName, quantity, customerName, address, city);
        $('#orderPopup').removeClass('active');
    });

    // Close when clicking outside
    $(document).click(function(e) {
        if ($(e.target).hasClass('order-popup')) {
            $('#orderPopup').removeClass('active');
        }
    });

    // Wishlist toggle
    $('.wishlist-btn').click(function() {
        $(this).find('i').toggleClass('far fas');
        $(this).toggleClass('active');
    });

    // Add to cart animation
    $('.add-to-cart-btn').click(function() {
        const btn = $(this);
        btn.html('<i class="fas fa-check"></i> Added');
        btn.css('background-color', 'var(--success-color)');
        
        setTimeout(() => {
            btn.html('<i class="fas fa-shopping-cart"></i> Add to Cart');
            btn.css('background-color', 'var(--primary-color)');
        }, 2000);
    });
});

function sendWhatsAppOrder(productName, quantity = 1, customerName = '', address = '', city = '') {
    const whatsappNumber = '923006297028'; // Replace with your number
    const message = `Order Inquiry:
    
Name of Product: ${productName}
Quantity: ${quantity}
Your Name: ${customerName}
Address: ${address}
City: ${city}

Please confirm my order.`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
}