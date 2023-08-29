import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from './service/ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import echoMindLogo from '../images/Screenshot 2023-08-16 172928.png'
import "./table.css";

export default function Table() {
  let emptyProduct = {
    id: null,
    name: '',
    image: null,
    description: '',
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: 'INSTOCK'
  };




  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);


  // TASK
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const requestData = {
        unique_id: '095c02f2-0fa3-4f8d-9cca-8168e8595f2c'
      };

      const response = await fetch('http://localhost:3000/user-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        setUserTasks(responseData.userTasks);
      } else {
        console.error('Failed to fetch user tasks');
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = [...products];
      let _product = { ...product };

      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        _product.id = createId();
        _product.image = 'product-placeholder.svg';
        _products.push(_product);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);

    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));

    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
  };

  const onCategoryChange = (e) => {
    let _product = { ...product };

    _product['category'] = e.value;
    setProduct(_product);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  const handleLogout = (event) => {
    console.log('logout');
  }

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2 d-flex justify-content-center align-items-center">
        {/* <Button label="New" icon="pi pi-plus" className='m-1 fs-5' severity="success" onClick={openNew} /> */}
        {/* <Button label="Export" icon="pi pi-upload" className="p-button-help m-1 fs-5" onClick={exportCSV} /> */}
        <img alt="logo" style={{ height: "7rem" }} src={echoMindLogo} className="mr-2"></img>
        <h4 className="my-4 fs-1 fw-bold" style={{ position: 'relative', top: '2px' }}>Manage Tasks</h4>
      </div>
    );
  };

  const rightToolbarTemplate = () => {

    return <div className='d-flex align-items-center'>
      <span className="p-input-icon-left mx-2 d-flex flex-wrap">
        <i className="pi pi-search mx-1" />
        <InputText className='fs-5 px-5 m-1 p-inputtext-lg' type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </span>
      {/* <Button label="New" icon="pi pi-plus" className='m-1 fs-4' severity="success" onClick={openNew} /> */}
      <Button label="Quit" icon="pi pi-fw pi-power-off" className="p-button-warning m-1 fs-4" onClick={handleLogout} />
    </div>
  };

  const imageBodyTemplate = (rowData) => {
    return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2 m-1" onClick={() => editProduct(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" className='m-1' onClick={() => confirmDeleteProduct(rowData)} />
      </React.Fragment>
    );
  };

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  };

  const inputButton = {
    position: 'relative',
    right: '7.2rem',
    fontSize: '2rem',
  }


  const header = (
    <form
      action="/"
      method="post"
      className="d-flex justify-content-center flex-wrap"
      style={{ backgroundColor: 'transparent' }}
    >
      <div class="d-flex  align-items-center"> {/* Added align-items-center */}
        <input
          type="text"
          class="form-control fs-3 p-4 px-5 rounded-pill border rounded-pill flex-grow-1" // Added flex-grow-1 class
          id="exampleFormControlInput1"
          placeholder="Type to add a new task..."
        />
        <Button
          icon="pi pi-plus"
          rounded
          severity="info"
          className="p-3 m-2" // Adjust padding for the button
          style={inputButton}
          onClick={hideDialog}
        />
      </div>
    </form>
  );
  
  

  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
    </React.Fragment>
  );

  return (
    <div className='m-3' style={{ userSelect: 'none' }}>
      <Toast ref={toast} />
      <div className="card border-0">
        <Toolbar className="fs-4 mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
      
  <form
    action="/"
    method="post"
    className="d-flex justify-content-center flex-wrap mb-4"
    style={{ backgroundColor: 'transparent' }}
  >
    <div class="d-flex align-items-center w-100"> {/* Added w-100 class */}
      <input
        type="text"
        class="form-control fs-3 p-4 px-5 rounded-pill border rounded-pill flex-grow-1" // Added flex-grow-1 class
        id="exampleFormControlInput1"
        placeholder="Type to add a new task..."
      />
      <div className="plus-icon hello"> {/* Added a container for the icon */}
        <Button
          icon="pi pi-plus"
          rounded
          severity="info"
          className="p-3 m-2" // Adjust padding for the button
          style={inputButton}
          onClick={hideDialog}
        />
      </div>
    </div>
  </form>



        <DataTable className='fs-4' ref={dt} value={userTasks} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} >
          <Column field="id" header="Id" sortable style={{ width: '5%' }} />
          <Column field="event_id" header="Event ID" style={{ width: '20%' }} />
          <Column field="task" header="Task" style={{ width: '25%' }} />
          <Column field="task_start_time" header="Start Time" style={{ width: '20%' }} />
          <Column field="task_end_time" header="End Time" style={{ width: '20%' }} />
          <Column field="Actions" header="Actions" body={actionBodyTemplate} exportable={false} style={{ width: '10%' }} ></Column>
        </DataTable>
      </div>

      <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
        {product.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" />}
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
          {submitted && !product.name && <small className="p-error">Name is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold">
            Description
          </label>
          <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
        </div>

        <div className="field">
          <label className="mb-3 font-bold">Category</label>
          <div className="formgrid grid">
            <div className="field-radiobutton col-6">
              <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
              <label htmlFor="category1">Accessories</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
              <label htmlFor="category2">Clothing</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
              <label htmlFor="category3">Electronics</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
              <label htmlFor="category4">Fitness</label>
            </div>
          </div>
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="price" className="font-bold">
              Price
            </label>
            <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
          </div>
          <div className="field col">
            <label htmlFor="quantity" className="font-bold">
              Quantity
            </label>
            <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
          </div>
        </div>
      </Dialog>

      <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {product && <span>Are you sure you want to delete the selected products?</span>}
        </div>
      </Dialog>
    </div>
  );
}
