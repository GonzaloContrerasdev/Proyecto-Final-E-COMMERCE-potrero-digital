document.addEventListener("DOMContentLoaded", () => {
  const themeDropdownItems = document.querySelectorAll(
    ".dropdown-item[data-theme]"
  );
  const currentTheme = localStorage.getItem("theme") || "light";
  const backToTopButton = document.getElementById("backToTop");

  document.documentElement.setAttribute("data-bs-theme", currentTheme);

  function switchTheme(e) {
    e.preventDefault();
    const selectedTheme = e.target.getAttribute("data-theme");
    document.documentElement.setAttribute("data-bs-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  }

  // biome-ignore lint/complexity/noForEach: <explanation>
  themeDropdownItems.forEach((item) => {
    item.addEventListener("click", switchTheme);
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // New code: Initialize filters
  function initializeFilters() {
    const filterButtons = document.querySelectorAll("[data-filter]");
    const products = document.querySelectorAll(".product-card");
    let currentFilter = "all";
    let currentSort = "";

    function filterProducts() {
      // biome-ignore lint/complexity/noForEach: <explanation>
      products.forEach((product) => {
        const category = product.dataset.category;
        const shouldShow =
          currentFilter === "all" || category === currentFilter;
        product.closest(".col").style.display = shouldShow ? "" : "none";
      });
    }

    function sortProducts(criteria) {
      const productList = Array.from(products);
      productList.sort((a, b) => {
        // biome-ignore lint/style/useNumberNamespace: <explanation>
        const priceA = parseFloat(
          a.querySelector(".price").textContent.replace("$", "")
        );
        // biome-ignore lint/style/useNumberNamespace: <explanation>
        const priceB = parseFloat(
          b.querySelector(".price").textContent.replace("$", "")
        );
        return criteria === "asc" ? priceA - priceB : priceB - priceA;
      });

      const container = document.querySelector(".row.row-cols-1");
      // biome-ignore lint/complexity/noForEach: <explanation>
      productList.forEach((product) => {
        container.appendChild(product.closest(".col"));
      });
    }

    // biome-ignore lint/complexity/noForEach: <explanation>
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        // biome-ignore lint/complexity/noForEach: <explanation>
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        filterProducts();
      });
    });

    document.getElementById("sortSelect").addEventListener("change", (e) => {
      currentSort = e.target.value;
      sortProducts(currentSort);
    });
  }

  // Call the initializeFilters function
  initializeFilters();
});
