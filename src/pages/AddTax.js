import { Field, FieldArray, Form, Formik, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import Checkbox from '../components/CheckBox';
import TextInput from '../components/TextInput';
// import
import { getAllItems } from '../mock/index';
import Button from '../components/Button';

function AddTax(props) {
  const [categorizedItems, setCategorizedItems] = useState({});
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState(true);
  const [search, setSearch] = useState('');

  const initialValues = {
    applicable_items: [],
    applied_to: 'some',
    name: 'test name',
    rate: 0.04,
    selectedCategories: [],
  };

  useEffect(() => {
    (async () => {
      const res = await getAllItems();
      organizeByCategory(res);
    })();
  }, []);

  const organizeByCategory = (resItems) => {
    let orgByCate = {};
    resItems.forEach((resItem) => {
      if (resItem.category) {
        if (!orgByCate[resItem?.category?.name]) {
          orgByCate[resItem?.category?.name] = [
            { name: resItem?.name, id: resItem?.id },
          ];
        } else {
          orgByCate[resItem?.category?.name].push({
            name: resItem?.name,
            id: resItem?.id,
          });
        }
      } else {
        if (!orgByCate['']) {
          orgByCate[''] = [{ name: resItem?.name, id: resItem?.id }];
        } else {
          orgByCate[''].push({
            name: resItem?.name,
            id: resItem?.id,
          });
        }
      }
    });
    setCategorizedItems(orgByCate);
    setCategories(Object.keys(orgByCate).sort((a, b) => (a > b ? -1 : 1)));
  };

  const onSubmit = (values) => {
    // console.log(values);
  };

  const getCategoryItemIds = (category) => {
    return categorizedItems[category].map((ci) => ci.id);
  };

  const renderCategoryItems = (category, values, setValues) => {
    return categorizedItems[category].map((item) => {
      return (
        <div className="mt-4 w-full pl-4">
          <label className="text-sm w-full inline-block px-3 py-2">
            <Checkbox
              checked={values?.applicable_items?.includes(item.id)}
              onChange={(e) => {
                let checked = e.target.checked;
                let applicable_items = checked
                  ? [...values?.applicable_items, item.id]
                  : values?.applicable_items?.filter((ai) => ai !== item.id);
                setValues({
                  ...values,
                  applicable_items: [...applicable_items],
                });
              }}
              color="#327B91"
            />
            <span className="ml-4">{item.name}</span>
          </label>
        </div>
      );
    });
  };

  const renderItems = (values, setValues) => {
    return categories.map((category) => {
      return (
        <>
          <div className="mt-4 w-full">
            <label className="text-sm w-full inline-block bg-gray-200 px-3 py-2">
              <Checkbox
                checked={(() => {
                  let check = true;
                  categorizedItems[category].forEach((ci) => {
                    if (!values?.applicable_items?.includes(ci.id)) {
                      check = false;
                    }
                  });
                  return check;
                })()}
                onChange={(e) => {
                  let checked = e.target.checked;
                  let categoryItemIds = getCategoryItemIds(category);
                  let applicable_items = checked
                    ? [...values?.applicable_items, ...categoryItemIds]
                    : values?.applicable_items?.filter(
                        (ai) => !categoryItemIds.includes(ai),
                      );
                  setValues({
                    ...values,
                    applicable_items: [...applicable_items],
                  });
                }}
              />
              <span className="ml-4">{category}</span>
            </label>
          </div>

          {renderCategoryItems(category, values, setValues)}
        </>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto shadow-md py-8 my-4 text-gray-700">
      <h1 className="text-2xl mb-4 px-8">Add Tax</h1>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, values, touched, setValues }) => (
          <Form>
            <div className="flex mb-2 px-8 max-w-xl">
              <Field name="name">
                {({ field }) => (
                  <TextInput
                    {...field}
                    className="w-3/4 mr-2"
                    placeholder="Tax Name"
                    type="text"
                  />
                )}
              </Field>
              <Field name="rate">
                {({ field }) => (
                  <TextInput
                    {...field}
                    className="w-1/4"
                    placeholder="Tax Value"
                    suffix="%"
                    type="number"
                  />
                )}
              </Field>
            </div>
            <FieldArray name="applicable_items">
              <div className="w-full border-t border-gray-200 px-8 mt-4 py-4">
                <TextInput
                  value={search}
                  onChange={setSearch}
                  className="w-72"
                  placeholder="Search Items"
                  prefix={() => (
                    <AiOutlineSearch className="text-md text-gray-500" />
                  )}
                />
                {renderItems(values, setValues)}
              </div>
            </FieldArray>
            <div className="w-full flex justify-end px-8">
              <Button type="submit">
                Apply tax to {values?.applicable_items?.length} item(s)
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

AddTax.propTypes = {};

export default AddTax;
