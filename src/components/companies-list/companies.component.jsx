const Companies = ({ companies, onChangeHandler }) => (
    <div className="companies">
        <select onChange={onChangeHandler}>
            {companies.map((company) => (
                <option key={company.id} value={company.name}>
                    {company.name}
                </option>
            ))}
        </select>
    </div>
);

export default Companies;
