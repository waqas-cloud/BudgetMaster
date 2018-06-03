package de.deadlocker8.budgetmaster.repeating.endoption;

import org.joda.time.DateTime;

import javax.persistence.*;
import java.util.List;

@Entity
public class RepeatingEndAfterXTimes extends RepeatingEnd
{
	private int times;

	public RepeatingEndAfterXTimes(int times)
	{
		super("repeating.end.key.afterXTimes");
		this.times = times;
	}

	public RepeatingEndAfterXTimes() {}

	@Override
	@Transient
	public boolean isEndReached(List<DateTime> dates)
	{
		return dates.size() - 1 > times;
	}

	@Override
	public Object getValue()
	{
		return times;
	}
}