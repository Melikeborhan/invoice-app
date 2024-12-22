"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";

const InvoiceForm = () => {
  const [invoiceForm, setInvoiceForm] = useState({
    customerName: "",
    customerSurname: "",
    customerAddress: "",
    invoiceDate: "",
    items: [
      {
        product: "",
        quantity: "",
        price: "",
        total: 0,
      },
    ],
  });

  const handleFinalizeInput = (e) => {
    const { id, value } = e.target;
    console.log(`${id}: ${value}`);
    setInvoiceForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const addItem = () => {
    setInvoiceForm((prevForm) => ({
      ...prevForm,
      items: [
        ...prevForm.items,
        { product: "", quantity: "", price: "", total: 0 },
      ],
    }));
  };

  const updateItem = (index, field, value) => {
    const updatedItems = invoiceForm.items.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [field]: value };
        updatedItem.total = updatedItem.quantity * updatedItem.price || 0; // Her item için toplamı hesapla
        return updatedItem;
      }
      return item;
    });

    setInvoiceForm((prevForm) => ({
      ...prevForm,
      items: updatedItems,
    }));
  };

  // Total fiyatı hesapla
  const calculateTotalPrice = () =>
    invoiceForm.items.reduce((acc, item) => acc + item.total, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!invoiceForm.customerName || !invoiceForm.customerSurname  || !invoiceForm.customerAddress|| !invoiceForm.invoiceDate || invoiceForm.items.length === 0){
      alert("please fill in all fields")
        return
    }
    try {
      console.log(invoiceForm)

      const response = await fetch('api/invoiceData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceForm),
      });

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Invoice has been saved successfully.",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "An error occurred while saving the invoice.",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred.",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      console.error(error);
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center ">
      <div className="bg-white p-5 rounded shadow-xl w-full max-w-4xl  ">
        <h1 className="text-2xl font-bold text-center ">Billing Invoice</h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="customerName" className="block font-medium mb-1">
              Customer Name
            </label>
            <input
              id="customerName"
              type="text"
              value={invoiceForm.customerName}
              onChange={handleFinalizeInput}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="customerSurname" className="block font-medium mb-1">
              Customer Surname
            </label>
            <input
              id="customerSurname"
              type="text"
              value={invoiceForm.customerSurname}
              onChange={handleFinalizeInput}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="date" className="block font-medium mb-1">
              Invoice Date
            </label>
            <input
              id="invoiceDate"
              type="date"
              value={invoiceForm.invoiceDate}
              onChange={handleFinalizeInput}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="customerAddress" className="block font-medium mb-1">
              Customer Address
            </label>
            <input
              id="customerAddress"
              type="text"
              value={invoiceForm.customerAddress}
              onChange={handleFinalizeInput}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="mb-4">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Product</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoiceForm.items.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">
                    <input
                      type="text"
                      className="w-full p-1 border rounded"
                      value={item.product}
                      onChange={(e) =>
                        updateItem(index, "product", e.target.value)
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      className="w-full p-1 border rounded"
                      value={item.quantity}
                      onChange={(e) =>{
                        const value = parseInt(e.target.value) || 0;
                        updateItem(index, "quantity", value < 0 ? 0: value);
                      }}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      className="w-full p-1 border rounded"
                      value={item.price}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        updateItem(index, "price", value < 0 ? 0 : value);
                      }}
                    />
                  </td>
                  <td className="border p-2">{item.total.toFixed(2)} TL</td>
                  <td className="border p-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        setInvoiceForm((prevForm) => ({
                          ...prevForm,
                          items: prevForm.items.filter((_, i) => i !== index),
                        }))
                      }
                    >
                      Remove
                    </button>
                  </td>
                </tr>
                
              ))}

            </tbody>

          </table>
          <button className="bg-yellow-500 text-white px-3 py-2 rounded" onClick={handleSubmit}>Submit</button>

        </div>
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            onClick={addItem}
          >
            Add Item
          </button>
          <div className="">
            <strong className="">Total Amount: {calculateTotalPrice().toFixed(2)} TL</strong>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default InvoiceForm;
