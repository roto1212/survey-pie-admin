import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import { Button, Form, Input, InputNumber, Switch } from "antd";
import { setQuestion } from "../../stores/survey/surveySlice";

const groups = [
  {
    title: '공통옵션',
    fields: [
      {
        label: '질문',
        name: 'title',
        rules: [{ required: true, message: "질문을 입력해주세요." }],
        type: 'text',
      },
      {
        label: '설명',
        name: 'desc',
        rules: [{ required: true, message: "설명을 입력해주세요." }],
        type: 'text',
      },
      {
        label: '필수 여부',
        name: 'required',
        rules: [{ required: true, message: "필수 여부를 선택해주세요." }],
        type: 'switch',
        valuePropName: 'checked',
      },
    ]
  },
];

const detailFieldsMap = {
  'text': [
    {
      label: 'Placeholder',
      name: 'placeholder',
      rules: [{ required: true, message: 'Placeholder를 입력해주세요.'}],
      type: 'text',
    },
    {
      label: '최대 입력 길이',
      name: 'maxLength',
      rules: [{ required: false}],
      type: 'number',
    }
  ],
  'textarea': [
    {
      label: 'Placeholder',
      name: 'placeholder',
      rules: [{ required: true, message: 'Placeholder를 입력해주세요.'}],
      type: 'text',
    },
    {
      label: '최대 입력 길이',
      name: 'maxLength',
      rules: [{ required: false}],
      type: 'number',
    }
  ],
  'select': [
    {
      label: '답변',
      name: 'items',
      rules: [{ required: true, message: '답변을 입력해주세요.'}],
      type: 'text',
    },
    {
      label: '최대 선택 가능 개수',
      name: 'max',
      rules: [{ required: false}],
      type: 'number',
    }
  ]
}
const getFieldInput = (type) => {
  if (type === 'text') return <Input />;
  if (type === 'textarea') return <Input.TextArea />;
  if (type === 'switch') return <Switch />;
  if (type === 'number') return <InputNumber />;
  return null;
}

function OptionSection() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const selectedQuestionId = useSelector(state => state.selectedQuestionId.data);
  const question = useSelector(state =>
    selectedQuestionId === null
      ? null
      : state.survey.data.questions[selectedQuestionId]
  );

  useEffect(() => {
    if (!question) return;

    const type = question.type;
    const detailFieldsValue = {};
    if (type === 'text' || type === 'textarea') {
      detailFieldsValue.placeholder = question.options.placeholder;
      detailFieldsValue.maxLength = question.options.maxLength;
    } else if (type === 'select') {
      detailFieldsValue.items = question.options.items.join(';');
      detailFieldsValue.max = question.options.max;
    }

    form.setFieldsValue({
      title: question.title,
      desc: question.desc,
      required: question.required,
      ...detailFieldsValue,
    });
  }, [question, form]);

  const mergedGroups = question ? [
    ...groups,
    {
      title: '세부 옵션',
      fields: detailFieldsMap[question.type],
    },
  ] : [];

  const handleApply = (values) => {
    const { title, desc, required, ...options } = values;
    dispatch(setQuestion({
      index: selectedQuestionId,
      question: {
        title,
        desc,
        required,
        options,
        type: question.type,
      },
    }));
  }


  const OptionForm = <FormWrapper>
    <Form form={form} name="option-form" layout="vertical" onFinish={handleApply}>
      {
        mergedGroups.map((group, index) => {
          return <Fragment key={index}>
            <SubTitle>{group.title}</SubTitle>
            {
              group.fields.map((field, index) => (
                <Form.Item key={index} label={field.label} name={field.name} rules={field.rules}>
                  {
                    getFieldInput(field.type)
                  }
                </Form.Item>
              ))
            }
          </Fragment>
        })
      }
      <Form.Item >
        <Button type="primary" htmlType="submit">적용</Button>
      </Form.Item>
    </Form>
  </FormWrapper>


	return <OptionSectionWrapper>
    <Title>문항 옵션</Title>
    {
      question
      ? <>
        {OptionForm}
      </>
      : <div>문항을 선택해주세요.</div>
    }
  </OptionSectionWrapper>;
}

const OptionSectionWrapper = styled.div`
	height: 100%;
	background: #fff;
	border-left: 1px solid #dddddd;
`;

const Title = styled.div`
  font-weight: 500;
  background: #f0f0f0;
  border-bottom: 1px solid #dddddd;
  padding: 10px 0;
  text-align: center;
`;

const FormWrapper = styled.div`
  padding: 20px;
`;

const SubTitle = styled.div`
  font-size: 1.03rem;
  font-weight: 600;
  margin: 10px 0;
`;

export default OptionSection;

