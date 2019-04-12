import React from 'react';
import Slider from './Slider.jsx';
import { Form } from 'react-bootstrap';

const budget = 400;

class SurveyModal extends React.Component {
  constructor(props) {
    super();
    this.state = {
      errorMessage: (null),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  convertSurveyDataForML(event) {
    const { ag1, ag2, ag3, def1, def2, def3, en1, en2, en3, fin1, fin2, fin3, he1, he2, he3, lab1, lab2, lab3 } = event.target.elements;
    //Find dwNominate score
    //Score will be between -1.0 and 1.0
    const liberalPositive = [ ag2, ag3, def2, def3, en2, en3, fin1, fin2, fin3, he1, he2, he3, lab1, lab2, lab3 ];
    const conservativePositive = [ ag1, def1, en1 ];
    let dwNominate = 0.0;
    for (let i=0; i<liberalPositive.length; i+=1) {
      dwNominate -= parseInt(liberalPositive[i].value);
    }
    for (let i=0; i<conservativePositive.length; i+=1) {
      dwNominate += parseInt(conservativePositive[i].value);
    }
    dwNominate /= budget;
    //Find ag, def, en, fin, he, lab
    //Combined they will sum to 1.0
    let ag = Math.abs(ag1.value) + Math.abs(ag2.value) + Math.abs(ag3.value);
    let def = Math.abs(def1.value) + Math.abs(def2.value) + Math.abs(def3.value);
    let en = Math.abs(en1.value) + Math.abs(en2.value) + Math.abs(en3.value);
    let fin = Math.abs(fin1.value) + Math.abs(fin2.value) + Math.abs(fin3.value);
    let he = Math.abs(he1.value) + Math.abs(he2.value) + Math.abs(he3.value);
    let lab = Math.abs(lab1.value) + Math.abs(lab2.value) + Math.abs(lab3.value);
    const total = ag + def + en + fin + he + lab;
    if (total === 0) {
      ag = 0.2
      def = 0.2;
      en = 0.2;
      fin = 0.2;
      he = 0.2;
      lab = 0.2;
    } else {
      ag /= total;
      def /= total;
      en /= total;
      fin /= total;
      he /= total;
      lab /= total;
    }
    return { dwNominate, ag, def, en, fin, he, lab, total };
  }

  handleSubmit(event) {
    event.preventDefault();
    const mlInput = this.convertSurveyDataForML(event);
    if (mlInput.total !== budget) {
      alert("Sorry! The total amount of donations needs to equal $" + budget + ". Currently you are spending $" + mlInput.total + ".");
      return;
    }
    return window.RouteHelper.fetch('/submitSurvey', {
      method: 'POST',
      body: JSON.stringify(mlInput),
    }).then((res) => {
      const { congressmen, success, message } = res;
      console.log(res)
      if (success) {
        $('#' + this.props.modalID).modal('hide');
        this.props.showMatches(congressmen);
      } else {
        alert(res.message);
      }
    });
  }

  render() {
    const { modalID } = this.props;
    return (
      <div className="modal fade" id={modalID} tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" style={{width: "90%", maxWidth: "800px"}}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title">Find Your Matches</h4>
            </div>
            <div className="modal-body" style={{textAlign: "center", padding: "32px"}}>
              <h5 style={{textAlign: "left"}}><b>Instructions: </b> The following survey is designed to gauge your legislative priorities and political ideology. When filling out the survey, pretend you are given ${budget} to donate to the following 18 causes. You are able to donate up to $50 for each particular cause.</h5>
              <br/>
              <br/>

              <Form action="" onSubmit={this.handleSubmit}>
                <h4>Agriculture, Food, and Consumer Goods</h4>
                <Slider
                  leftLabel={"Invest in American Farmers to promote growing food in America"}
                  rightLabel={"Spend less on American farmers, import more, export less food"}
                  name={"ag1"}
                />
                <Slider
                  leftLabel={"Invest in public schools to provide nutritious meals to students"}
                  rightLabel={"Spend less on food for students in public schools"}
                  name={"ag2"}
                />
                <Slider
                  leftLabel={"Invest in more transparency for consumers and tighter regulations on food, drugs, and consumer goods"}
                  rightLabel={"Spend less on food, drug, and consumer good regulation"}
                  name={"ag3"}
                />
              <br/>
              <br/>

                <h4>Defense and Global Relations</h4>
                <Slider
                  leftLabel={"Invest in America’s military resources – technology & people"}
                  rightLabel={"Reduce budget for America’s military resources"}
                  name={"def1"}
                />
                <Slider
                  leftLabel={"Invest in financial assistance to under-developed countries"}
                  rightLabel={"Reduce budget for foreign aid"}
                  name={"def2"}
                />
                <Slider
                  leftLabel={"Invest in global relationships and conflict resolution through politics"}
                  rightLabel={"Reduce budget for global relations and ambassadors"}
                  name={"def3"}
                />
              <br/>
              <br/>

                <h4>Energy and Transportation</h4>
                <Slider
                  leftLabel={"Invest in traditional energy sources – oil & gas"}
                  rightLabel={"Reduce budget for traditional energy sources"}
                  name={"en1"}
                />
                <Slider
                  leftLabel={"Invest in alternate energy sources and climate research"}
                  rightLabel={"Reduce budget for alternate energy sources and climate research"}
                  name={"en2"}
                />
                <Slider
                  leftLabel={"Invest in transportation industries (air travel, rail, highways)"}
                  rightLabel={"Reduce budget for transportation"}
                  name={"en3"}
                />
              <br/>
              <br/>

                <h4>Finance, Insurance, and Real Estate</h4>
                <Slider
                  leftLabel={"Invest in regulations for banks and insurance companies"}
                  rightLabel={"Reduce budget for regulating banks and insurance companies"}
                  name={"fin1"}
                />
                <Slider
                  leftLabel={"Invest in social security"}
                  rightLabel={"Reduce budget for social security"}
                  name={"fin2"}
                />
                <Slider
                  leftLabel={"Invest in social welfare and assistance for Americans living in poverty"}
                  rightLabel={"Reduce budget for social welfare and assistance programs"}
                  name={"fin3"}
                />
              <br/>
              <br/>

                <h4>Health</h4>
                <Slider
                  leftLabel={"Invest in medical research"}
                  rightLabel={"Reduce budget for medical research"}
                  name={"he1"}
                />
                <Slider
                  leftLabel={"Invest in Medicaid and Medicare"}
                  rightLabel={"Reduce budget for Medicaid and Medicare"}
                  name={"he2"}
                />
                <Slider
                  leftLabel={"Invest in regulations for pharmaceutical and healthcare industries"}
                  rightLabel={"Reduce budget for regulating pharmaceutical and healthcare industries"}
                  name={"he3"}
                />
              <br/>
              <br/>

                <h4>Labor and Employment</h4>
                <Slider
                  leftLabel={"Invest in pay equity and reducing discrimination within the workplace"}
                  rightLabel={"Reduce budget for pay equity and reducing discrimination"}
                  name={"lab1"}
                />
                <Slider
                  leftLabel={"Invest in training and education to prepare Americans for jobs "}
                  rightLabel={"Reduce budget for training and education for the American workforce"}
                  name={"lab2"}
                />
                <Slider
                  leftLabel={"Invest in increased minimum wage and workers’ rights"}
                  rightLabel={"Reduce budget for increasing minimum wage and workers’ rights"}
                  name={"lab3"}
                />

                <button
                  style={{width: "100%"}}
                  className="btn btn-primary"
                  type="submit"
                  //href={`#${modalID}`}
                  //data-target={`#${modalID}`}
                  //data-toggle="modal"
                >Submit
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SurveyModal;
