$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Fetch and display products on shop page
    if ($('.met-team-shop').length) {
        $.getJSON('assets/products.json', function (data) {
            var productHtml = '';
            $.each(data, function (key, value) {
                productHtml += `
                    <div class="met-shop-inner">
                        <div class="met-team-box">
                            <div class="met-team-box-inner">
                                <div class="met-team-img">
                                    <img src="${value.image}" alt="Team Member">
                                </div>
                                <a href="product-detail.html?id=${value.id}" class="met-team-content">
                                    <h4>${value.name}</h4>
                                </a>
                                <a href="product-detail.html?id=${value.id}" class="met-btn">View Details</a>
                            </div>
                        </div>
                    </div>
                `;
            });
            $('.met-team-shop').html(productHtml);
        });
    }

    // Fetch and display product details on product-detail page
    if (productId) {
        $.getJSON('assets/products.json', function (data) {
            var product = data.find(p => p.id == productId);
            if (product) {
                $('#product-name-breadcrumb').text(product.name);
                $('#product-name').text(product.name);
                $('#product-image').attr('src', product.image);
                $('#product-description').text(product.description);
            }
        });
    }
});
