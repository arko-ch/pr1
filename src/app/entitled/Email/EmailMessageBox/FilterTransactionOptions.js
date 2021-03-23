import React from 'react';
import {
  StyledFilterContainer,
  StyledFilterHeader,
  StyledFilterHeaderTwo,
  StyledLabel,
  StyledResetButton,
  StyledSearchButton,
  StyledFilterOptionsContainer
} from '../EmailStyledComponents';

const FilterTransactionOptions = ({
  tags,
  allFilterClickListener,
  initSearchResultAndFilter
}) => {
  console.log('transactionTags in filterPage', tags);
  // console.log(
  //   'In the FilterTransaction Component the state of Recent ->',
  //   tags.transactionStage.Recent
  // );

  return (
    <StyledFilterContainer>
      <StyledFilterHeader>Refine your Search</StyledFilterHeader>
      <div style={{ marginTop: '20px' }}>
        <StyledFilterHeaderTwo>Transaction Stage</StyledFilterHeaderTwo>
        <StyledFilterOptionsContainer id="transactionStage">
          <div>
            <input
              type="checkbox"
              data-name="Recent"
              id="Recent"
              defaultChecked={tags.transactionStage.Recent}
              onClick={e => allFilterClickListener(e, 'transactionStage')}
            />
            <StyledLabel data-name="Recent" htmlFor="Recent">
              Recent
            </StyledLabel>
          </div>

          <div>
            <input
              type="checkbox"
              name="Paused"
              id="Paused"
              data-name="Paused"
              defaultChecked={tags.transactionStage.Paused}
              onClick={e => allFilterClickListener(e, 'transactionStage')}
            />
            <StyledLabel htmlFor="Paused" data-name="Paused">
              Paused
            </StyledLabel>
          </div>
          <div>
            <input
              type="checkbox"
              name="NewOrder"
              id="NewOrder"
              data-name="NewOrder"
              defaultChecked={tags.transactionStage.NewOrder}
              onClick={e => allFilterClickListener(e, 'transactionStage')}
            />
            <StyledLabel htmlFor="NewOrder" data-name="NewOrder">
              New Order
            </StyledLabel>
          </div>

          <div>
            <input
              type="checkbox"
              name="Archived"
              id="Archived"
              data-name="Archived"
              defaultChecked={tags.transactionStage.Archived}
              onClick={e => allFilterClickListener(e, 'transactionStage')}
            />
            <StyledLabel htmlFor="Archived" data-name="Archived">
              Archived
            </StyledLabel>
          </div>
          <div>
            <input
              type="checkbox"
              name="Searches"
              id="Searches"
              data-name="Searches"
              defaultChecked={tags.transactionStage.Searches}
              onClick={e => allFilterClickListener(e, 'transactionStage')}
            />
            <StyledLabel htmlFor="Searches" data-name="Searches">
              Searches
            </StyledLabel>
          </div>
          <div>
            <input
              type="checkbox"
              name="Commitment"
              id="Commitment"
              data-name="Commitment"
              defaultChecked={tags.transactionStage.Commitment}
              onClick={e => allFilterClickListener(e, 'transactionStage')}
            />
            <StyledLabel htmlFor="Commitment" data-name="Commitment">
              Commitment
            </StyledLabel>
          </div>
          <div>
            <input
              type="checkbox"
              name="Closing"
              id="Closing"
              data-name="Closing"
              defaultChecked={tags.transactionStage.Closing}
              onClick={e => allFilterClickListener(e, 'transactionStage')}
            />
            <StyledLabel htmlFor="Closing" data-name="Closing">
              Closing
            </StyledLabel>
          </div>
          <div>
            <input
              type="checkbox"
              name="Policy"
              id="Policy"
              data-name="Policy"
              defaultChecked={tags.transactionStage.Policy}
              onClick={e => allFilterClickListener(e, 'transactionStage')}
            />
            <StyledLabel htmlFor="Policy" data-name="Policy">
              Policy
            </StyledLabel>
          </div>
          <div>
            <input
              type="checkbox"
              name="PostClose"
              id="PostClose"
              data-name="PostClose"
              defaultChecked={tags.transactionStage.PostClose}
              onClick={e => allFilterClickListener(e, 'transactionStage')}
            />
            <StyledLabel htmlFor="PostClose" data-name="PostClose">
              Post Close
            </StyledLabel>
          </div>
        </StyledFilterOptionsContainer>
        <StyledFilterHeaderTwo>Transaction Type</StyledFilterHeaderTwo>
        <StyledFilterOptionsContainer id="transactionType">
          <div>
            <input
              type="checkbox"
              name="purchase"
              id="purchase"
              data-name="purchase"
              defaultChecked={tags.transactionType.purchase}
              onClick={e => allFilterClickListener(e, 'transactionType')}
            />
            <StyledLabel htmlFor="purchase" data-name="purchase">
              Purchase
            </StyledLabel>
          </div>
          <div>
            <input
              type="checkbox"
              name="refinance"
              id="refinance"
              data-name="refinance"
              defaultChecked={tags.transactionType.refinance}
              onClick={e => allFilterClickListener(e, 'transactionType')}
            />
            <StyledLabel htmlFor="refinance" data-name="refinance">
              Refinance
            </StyledLabel>
          </div>
          <div>
            <input
              type="checkbox"
              name="short_sale"
              id="short_sale"
              data-name="short_sale"
              defaultChecked={tags.transactionType.short_sale}
              onClick={e => allFilterClickListener(e, 'transactionType')}
            />
            <StyledLabel htmlFor="short_sale" data-name="short_sale">
              Short Sale
            </StyledLabel>
          </div>
          <div>
            <input
              type="checkbox"
              name="commercial"
              id="commercial"
              data-name="commercial"
              defaultChecked={tags.transactionType.commercial}
              onClick={e => allFilterClickListener(e, 'transactionType')}
            />
            <StyledLabel htmlFor="commercial" data-name="commercial">
              Commercial
            </StyledLabel>
          </div>
          <div>
            <input
              type="checkbox"
              name="searches_only"
              id="searches_only"
              data-name="searches_only"
              defaultChecked={tags.transactionType.searches_only}
              onClick={e => allFilterClickListener(e, 'transactionType')}
            />
            <StyledLabel htmlFor="searches_only" data-name="searches_only">
              Searches Only
            </StyledLabel>
          </div>
        </StyledFilterOptionsContainer>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '30px'
        }}
      >
        <StyledResetButton onClick={() => initSearchResultAndFilter()}>
          Reset Filter
        </StyledResetButton>
        {/*  <StyledSearchButton>Search</StyledSearchButton> */}
      </div>
    </StyledFilterContainer>
  );
};

export default FilterTransactionOptions;
