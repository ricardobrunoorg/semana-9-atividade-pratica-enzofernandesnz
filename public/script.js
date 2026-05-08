const data = {
  produtos: [
    {
      id: 1,
      nome: "Smartphone Galaxy S23",
      preco: 3499.90,
      categoria: "Celulares",
      imagem: "https://example.com/imagens/galaxy-s23.jpg",
      descricao: "Smartphone com 128GB de armazenamento, câmera de alta resolução e excelente desempenho.",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Notebook Dell Inspiron 15",
      preco: 4599.00,
      categoria: "Notebooks",
      imagem: "https://example.com/imagens/dell-inspiron-15.jpg",
      descricao: "Notebook com processador Intel i7, 16GB de RAM e SSD de 512GB, ideal para trabalho e estudos.",
      emEstoque: false
    },
    {
      id: 3,
      nome: "iPhone 14",
      preco: 5999.90,
      categoria: "Celulares",
      imagem: "https://example.com/imagens/iphone-14.jpg",
      descricao: "Smartphone Apple com chip A15 Bionic, câmera dupla de 12MP e tela Super Retina XDR de 6.1 polegadas.",
      emEstoque: true
    },
    {
      id: 4,
      nome: "MacBook Air M2",
      preco: 12999.00,
      categoria: "Notebooks",
      imagem: "https://example.com/imagens/macbook-air-m2.jpg",
      descricao: "Notebook Apple com chip M2, 8GB de RAM e SSD de 256GB, ultrafino e silencioso.",
      emEstoque: true
    },
    {
      id: 5,
      nome: "AirPods Pro 2",
      preco: 1899.00,
      categoria: "Acessórios",
      imagem: "https://example.com/imagens/airpods-pro-2.jpg",
      descricao: "Fones de ouvido com cancelamento ativo de ruído, áudio espacial e case MagSafe.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Mouse Logitech MX Master 3S",
      preco: 599.90,
      categoria: "Acessórios",
      imagem: "https://example.com/imagens/mx-master-3s.jpg",
      descricao: "Mouse ergonômico sem fio com sensor de 8000 DPI e scroll eletromagnético silencioso.",
      emEstoque: false
    },
    {
      id: 7,
      nome: "PlayStation 5",
      preco: 4199.90,
      categoria: "Games",
      imagem: "https://example.com/imagens/ps5.jpg",
      descricao: "Console Sony com SSD ultra-rápido, ray tracing e suporte para jogos em 4K a 120fps.",
      emEstoque: false
    },
    {
      id: 8,
      nome: "Xbox Series X",
      preco: 4499.90,
      categoria: "Games",
      imagem: "https://example.com/imagens/xbox-series-x.jpg",
      descricao: "Console Microsoft com 12 teraflops de potência, SSD de 1TB e retrocompatibilidade total.",
      emEstoque: true
    }
  ]
};


const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");


function formatPrice(preco) {
  return `R$ ${preco.toFixed(2).replace('.', ',')}`;
}

function createProductCard(produto) {
  const card = document.createElement('div');
  card.setAttribute('data-id', produto.id);
  card.classList.add('card');
  card.style.border = '1px solid #ccc';
  card.style.padding = '15px';
  card.style.margin = '10px';
  card.style.borderRadius = '8px';
  card.style.cursor = 'pointer';

  const img = document.createElement('img');
  img.src = produto.imagem;
  img.alt = produto.nome;
  img.style.width = '100%';
  img.style.maxWidth = '200px';

  const title = document.createElement('h3');
  title.classList.add('card-title');
  title.textContent = produto.nome;

  const price = document.createElement('p');
  price.textContent = formatPrice(produto.preco);
  price.style.fontWeight = 'bold';
  price.style.color = '#2c7a2c';

  const category = document.createElement('p');
  category.textContent = `Categoria: ${produto.categoria}`;

  const stock = document.createElement('p');
  stock.textContent = produto.emEstoque ? 'Em estoque' : 'Fora de estoque';
  stock.style.color = produto.emEstoque ? 'green' : 'red';

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(category);
  card.appendChild(stock);

  card.addEventListener('click', () => showProductDetails(produto));

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = '';
  produtos.forEach(produto => {
    const card = createProductCard(produto);
    productList.appendChild(card);
  });
}

function renderCategories() {
  const categorias = ['Todas'];
  data.produtos.forEach(produto => {
    if (!categorias.includes(produto.categoria)) {
      categorias.push(produto.categoria);
    }
  });

  categorySelect.innerHTML = '';
  categorias.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat === 'Todas' ? '' : cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function showProductDetails(produto) {
  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <img src="${produto.imagem}" alt="${produto.nome}" style="max-width: 300px;">
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Status:</strong> ${produto.emEstoque ? 'Em estoque' : 'Fora de estoque'}</p>
    <p><strong>Descrição:</strong> ${produto.descricao}</p>
  `;
  productDetails.style.border = '2px solid #333';
  productDetails.style.padding = '20px';
  productDetails.style.marginTop = '20px';
}

function filterProducts() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;

  return data.produtos.filter(produto => {
    const matchesSearch = produto.nome.toLowerCase().includes(searchText);
    const matchesCategory = selectedCategory === '' || produto.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });
}
