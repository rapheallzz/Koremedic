$(document).ready(function () {
    console.log("Dynamic product script loaded.");

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Fetch and display products on shop page
    if ($('#product-list').length) {
        console.log("Shop page detected. Fetching products...");
        $.getJSON('assets/products.json', function (data) {
            console.log("Successfully fetched products.json. Data:", data);
            var productHtml = '';
            $.each(data, function (key, value) {
                productHtml += `
                    <div class="met-shop-inner">
                        <div class="met-team-box">
                            <div class="met-team-box-inner">
                                <div class="met-team-img">
                                    <img src="${value.image}" alt="${value.name}">
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
            console.log("Generated HTML:", productHtml);
            $('#product-list').html(productHtml);
            console.log("Products loaded into the page.");
        }).fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.error("Failed to fetch products.json: " + err);
        });
    }

    // Fetch and display product details on product-detail page
    if (productId) {
        console.log(`Product detail page detected. Fetching product with ID: ${productId}`);
        $.getJSON('assets/products.json', function (data) {
            console.log("Successfully fetched products.json for detail page.");
            var product = data.find(p => p.id == productId);
            if (product) {
                console.log("Found product:", product);
                $('#product-name-breadcrumb').text(product.name);
                $('#product-name').text(product.name);
                $('#product-image').attr('src', product.image);
                $('#product-description').text(product.description);
                console.log("Product details loaded.");
            } else {
                console.error("Product with ID " + productId + " not found.");
            }
        }).fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.error("Failed to fetch products.json for detail page: " + err);
        });
    }
});
