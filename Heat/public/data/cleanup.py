#!/usr/env/bin python
import pandas as pd

# heat events data
print '-----------heat events-----------'
heat_events_filename = './raw_data/Trends in Heat Events - Two or More Days Reaching 95 Degrees or More.csv'
heat_events_df = pd.read_csv(heat_events_filename, skip_blank_lines=True, skiprows=range(0, 8), skipfooter=4, engine='python')
heat_events_df = heat_events_df[['x_value', 'y_value']].iloc[::-1].drop_duplicates()
print heat_events_df[:5]
heat_events_df.to_csv('heat_events.csv', index=False)

# heat deaths data
print '-----------heat deaths-----------'
heat_deaths_filename = './raw_data/Trends in Heat Stress Deaths - Number.csv'
heat_deaths_df = pd.read_csv(heat_deaths_filename, skip_blank_lines=True, skiprows=range(0, 8), skipfooter=4, engine='python')
heat_deaths_df = heat_deaths_df[['x_value', 'y_value']].iloc[::-1]
print heat_deaths_df[:5]
heat_deaths_df.to_csv('heat_deaths.csv', index=False)

#heat events + heat deaths
print '-----------heat events + heat deaths-----------'
merged = heat_events_df.merge(heat_deaths_df, on="x_value", how="outer").fillna("null")
merged.columns = ['year', 'heat_events', 'heat_deaths']
print merged
merged.to_csv('heat_events_and_heat_deaths.csv', index=False)


# adults 65+ reporting ac
print '-----------adults 65+ reporting ac-----------'
ac_65_filename = './raw_data/Adults 65+ Reporting Air Conditioning in the Home.csv'
ac_65_df = pd.read_csv(ac_65_filename, skip_blank_lines=True, skiprows=range(0, 8), skipfooter=4, engine='python')
ac_65_df.drop(ac_65_df.columns[len(ac_65_df.columns)-1], axis=1, inplace=True)
print ac_65_df[:5]
ac_65_df.to_csv('ac_over_65.csv', index=False)

# heat stress hospitalizations
print '-----------heat stress hospitalizations-----------'
heat_hosp_filename = './raw_data/Heat Stress Hospitalizations.csv'
heat_hosp_df = pd.read_csv(heat_hosp_filename, skip_blank_lines=True, skiprows=range(0, 10), skipfooter=4, engine='python')
heat_hosp_df.drop(heat_hosp_df.columns[len(heat_hosp_df.columns)-1], axis=1, inplace=True)
print heat_hosp_df[:5]
heat_hosp_df.to_csv('heat_hosp.csv', index=False)

# ac in household
print '-----------ac in household-----------'
household_ac_filename = './raw_data/Households reporting air conditioning.csv'
household_ac_df = pd.read_csv(household_ac_filename, skip_blank_lines=True, skiprows=range(0, 6), skipfooter=4, engine='python')
household_ac_df.drop(household_ac_df.columns[len(household_ac_df.columns)-1], axis=1, inplace=True)
print household_ac_df[:5]
household_ac_df.to_csv('household_ac.csv', index=False)

# hvi
print '-----------hvi-----------'
hvi_filename = './raw_data/Heat Vulnerability Index.csv'
hvi_df = pd.read_csv(hvi_filename, skip_blank_lines=True, skiprows=range(0, 14), skipfooter=4, engine='python')
hvi_df.drop(hvi_df.columns[len(hvi_df.columns)-1], axis=1, inplace=True)
print hvi_df[:5]
hvi_df.to_csv('hvi.csv', index=False)


# heat hospitalizations
print '----------heat hosp----------'
heat_hosp_filename = './raw_data/Trends in Heat Stress Hospitalizations - Age-Adjusted Rate.csv'
heat_hosp_df = pd.read_csv(heat_hosp_filename, skip_blank_lines=True, skiprows=range(0, 9), skipfooter=4, engine='python')
heat_hosp_df = heat_hosp_df[['x_value', 'y_value']].iloc[::-1]
print heat_hosp_df[:5]
heat_hosp_df.to_csv('heat_hosp.csv', index=False)


# heat events + heat hosp
print '-----------heat events + heat hosp-----------'
m = heat_events_df.merge(heat_hosp_df, on="x_value", how="outer").fillna("null")
m.columns = ['year', 'heat_events', 'heat_hosp']
print m
m.to_csv('heat_events_and_heat_hosp.csv', index=False)

