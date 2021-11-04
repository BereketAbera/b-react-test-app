import { Field, FieldArray, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import Checkbox from '../components/CheckBox';
import TextInput from '../components/TextInput';
// import
import { filterItems, getAllItems } from '../mock/index';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';

function AddTax() {
  const [categorizedItems, setCategorizedItems] = useState({});
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');

  const initialValues = {
    applicable_items: [],
    applied_to: 'some',
    name: '',
    rate: 0.05,
  };

  useEffect(() => {
    (async () => {
      const res = await getAllItems();
      organizeByCategory(res);
    })();
  }, []);

  useEffect(() => {
    const filter = async () => {
      const res = await filterItems(search);
      organizeByCategory(res);
    };
    if (search) filter(search);
  }, [search]);

  const organizeByCategory = (resItems) => {
    let orgByCate = {};
    resItems?.forEach((resItem) => {
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
    console.log(values);
  };

  const getCategoryItemIds = (category) => {
    return categorizedItems[category]?.map((ci) => ci.id);
  };

  const getUniqueItems = (uniqueFrom, uniqueAgainst) => {
    return uniqueFrom.filter((item) => {
      return !uniqueAgainst.includes(item);
    });
  };

  const selectAllItems = (values, setValues) => {
    let itemIds = [];
    categories.forEach((category) => {
      itemIds = [...itemIds, ...getCategoryItemIds(category)];
    });

    setValues({ ...values, applied_to: 'all', applicable_items: [...itemIds] });
  };

  const renderCategoryItems = (category, values, setValues) => {
    return categorizedItems[category]?.map((item) => {
      return (
        <div key={item.id} className="mt-4 w-full pl-4">
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
                  applied_to: 'some',
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
    return categories?.map((category, index) => {
      return (
        <div key={category + index}>
          <div className="mt-4 w-full">
            <label className="text-sm w-full inline-block bg-gray-200 px-3 py-2">
              <Checkbox
                checked={(() => {
                  let check = true;
                  categorizedItems[category]?.forEach((ci) => {
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
                    ? [
                        ...values?.applicable_items,
                        ...getUniqueItems(
                          categoryItemIds,
                          values?.applicable_items,
                        ),
                      ]
                    : values?.applicable_items?.filter(
                        (ai) => !categoryItemIds.includes(ai),
                      );
                  setValues({
                    ...values,
                    applied_to: 'some',
                    applicable_items: [...applicable_items],
                  });
                }}
              />
              <span className="ml-4">{category}</span>
            </label>
          </div>

          {renderCategoryItems(category, values, setValues)}
        </div>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto shadow-md py-8 my-4 text-gray-700">
      <h1 className="text-2xl mb-4 px-8">Add Tax</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                    onChange={(e) => {
                      setValues({
                        ...values,
                        rate: isNaN(e.target.value)
                          ? e.target.value
                          : parseInt(e.target.value) / 100,
                      });
                    }}
                    value={values?.rate ? values?.rate * 100 : ''}
                    className="w-1/4"
                    placeholder="Tax Value"
                    suffix="%"
                    type="number"
                  />
                )}
              </Field>
            </div>
            <div className="flex-col px-9 my-4 text-sm">
              <Field name="applied_to">
                {({ field }) => (
                  <label className="block mb-2">
                    <RadioButton
                      {...field}
                      selected={values?.applied_to === 'all'}
                      value="all"
                      onClick={(e) => {
                        if (values?.applied_to === 'some') {
                          selectAllItems(values, setValues);
                        }
                      }}
                    ></RadioButton>
                    <span className="ml-2">
                      Apply to all items in collection
                    </span>
                  </label>
                )}
              </Field>
              <Field name="applied_to">
                {({ field }) => (
                  <label className="block">
                    <RadioButton
                      {...field}
                      selected={values?.applied_to === 'some'}
                      value="some"
                      onClick={(e) => {
                        if (values?.applied_to === 'all') {
                          setValues({ ...values, applied_to: 'some' });
                        }
                      }}
                    ></RadioButton>
                    <span className="ml-2">Apply to specific items</span>
                  </label>
                )}
              </Field>
            </div>
            <FieldArray name="applicable_items">
              <div className="w-full border-t border-gray-200 px-8 mt-4 py-4">
                <TextInput
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-72"
                  placeholder="Search Items"
                  prefix={() => (
                    <AiOutlineSearch className="text-md text-gray-500" />
                  )}
                />
                {categories?.length > 0 && renderItems(values, setValues)}
                {categories?.length === 0 && (
                  <div className="text-gray-600 text-center p-4 my-4">
                    No Items Found
                  </div>
                )}
              </div>
            </FieldArray>
            {categories?.length > 0 && (
              <div className="w-full flex justify-end px-8">
                <Button type="submit">
                  Apply tax to {values?.applicable_items?.length} item(s)
                </Button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

AddTax.propTypes = {};

export default AddTax;
